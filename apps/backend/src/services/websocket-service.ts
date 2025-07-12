import WebSocket, { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { URL } from "url";

export interface RealtimeEvent {
  type: string;
  data: any;
  timestamp: string;
  userId?: string;
  groupId?: string;
}

export interface ClientConnection {
  ws: WebSocket;
  userId: string;
  groups: Set<string>;
  lastPing: number;
}

export class WebSocketService {
  private static instance: WebSocketService;
  private clients = new Map<string, ClientConnection>();
  private groups = new Map<string, Set<string>>(); // groupId -> Set of userIds
  private pingInterval: NodeJS.Timeout | null = null;
  private cleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.startPingInterval();
    this.startCleanupInterval();
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  /**
   * Initialize WebSocket server
   */
  initializeServer(server: any): void {
    const wss = new WebSocketServer({
      server,
      path: "/ws",
      verifyClient: this.verifyClient.bind(this),
    });

    wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      this.handleConnection(ws, req);
    });

    console.log("📡 WebSocket server initialized");
  }

  /**
   * Handle new WebSocket connection
   */
  private handleConnection(ws: WebSocket, req: IncomingMessage): void {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      console.log("❌ WebSocket connection rejected: missing userId");
      ws.close(1008, "Missing userId parameter");
      return;
    }

    console.log(`🔗 New WebSocket connection: ${userId}`);

    // Create client connection
    const clientConnection: ClientConnection = {
      ws,
      userId,
      groups: new Set(),
      lastPing: Date.now(),
    };

    this.clients.set(userId, clientConnection);

    // Set up event handlers
    ws.on("message", (data: WebSocket.Data) => {
      this.handleMessage(userId, data);
    });

    ws.on("close", (code: number, reason: string) => {
      this.handleDisconnection(userId, code, reason);
    });

    ws.on("error", (error: Error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
      this.handleDisconnection(userId, 1011, "Internal error");
    });

    ws.on("pong", () => {
      const client = this.clients.get(userId);
      if (client) {
        client.lastPing = Date.now();
      }
    });

    // Send welcome message
    this.sendToClient(userId, {
      type: "connection_established",
      data: {
        message: "Connected to Community Wallet real-time service",
        userId,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Handle incoming messages from clients
   */
  private handleMessage(userId: string, data: WebSocket.Data): void {
    try {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case "ping":
          this.sendToClient(userId, {
            type: "pong",
            data: { timestamp: new Date().toISOString() },
            timestamp: new Date().toISOString(),
          });
          break;

        case "join_group":
          this.joinGroup(userId, message.groupId);
          break;

        case "leave_group":
          this.leaveGroup(userId, message.groupId);
          break;

        case "heartbeat":
          // Update last ping time
          const client = this.clients.get(userId);
          if (client) {
            client.lastPing = Date.now();
          }
          break;

        default:
          console.log(`Unknown message type from ${userId}:`, message.type);
      }
    } catch (error) {
      console.error(`Error parsing message from ${userId}:`, error);
    }
  }

  /**
   * Handle client disconnection
   */
  private handleDisconnection(
    userId: string,
    code: number,
    reason: string
  ): void {
    console.log(`🔌 WebSocket disconnected: ${userId} (${code}: ${reason})`);

    const client = this.clients.get(userId);
    if (client) {
      // Remove from all groups
      client.groups.forEach((groupId) => {
        this.leaveGroup(userId, groupId);
      });

      // Remove client
      this.clients.delete(userId);
    }
  }

  /**
   * Verify client connection
   */
  private verifyClient(info: { req: IncomingMessage }): boolean {
    // Add authentication/authorization logic here
    // For now, allow all connections
    return true;
  }

  /**
   * Send message to specific user
   */
  sendToUser(userId: string, event: RealtimeEvent): void {
    this.sendToClient(userId, event);
  }

  /**
   * Send message to all members of a group
   */
  sendToGroup(groupId: string, event: RealtimeEvent): void {
    const groupMembers = this.groups.get(groupId);
    if (groupMembers) {
      groupMembers.forEach((userId) => {
        this.sendToClient(userId, event);
      });
    }
  }

  /**
   * Broadcast message to all connected clients
   */
  broadcast(event: RealtimeEvent): void {
    this.clients.forEach((client, userId) => {
      this.sendToClient(userId, event);
    });
  }

  /**
   * Join a group channel
   */
  private joinGroup(userId: string, groupId: string): void {
    const client = this.clients.get(userId);
    if (!client) {
      console.error(`Cannot join group: user ${userId} not connected`);
      return;
    }

    // Add user to group
    if (!this.groups.has(groupId)) {
      this.groups.set(groupId, new Set());
    }
    this.groups.get(groupId)!.add(userId);

    // Add group to user's groups
    client.groups.add(groupId);

    console.log(`👥 User ${userId} joined group ${groupId}`);

    // Send confirmation
    this.sendToClient(userId, {
      type: "group_joined",
      data: { groupId },
      timestamp: new Date().toISOString(),
    });

    // Notify other group members
    this.sendToGroup(groupId, {
      type: "member_connected",
      data: { userId, groupId },
      timestamp: new Date().toISOString(),
      groupId,
    });
  }

  /**
   * Leave a group channel
   */
  private leaveGroup(userId: string, groupId: string): void {
    const client = this.clients.get(userId);
    if (client) {
      client.groups.delete(groupId);
    }

    const group = this.groups.get(groupId);
    if (group) {
      group.delete(userId);

      // Remove empty groups
      if (group.size === 0) {
        this.groups.delete(groupId);
      }
    }

    console.log(`👋 User ${userId} left group ${groupId}`);

    // Send confirmation
    this.sendToClient(userId, {
      type: "group_left",
      data: { groupId },
      timestamp: new Date().toISOString(),
    });

    // Notify other group members
    this.sendToGroup(groupId, {
      type: "member_disconnected",
      data: { userId, groupId },
      timestamp: new Date().toISOString(),
      groupId,
    });
  }

  /**
   * Send message to a specific client
   */
  private sendToClient(userId: string, event: RealtimeEvent): void {
    const client = this.clients.get(userId);
    if (!client || client.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      client.ws.send(JSON.stringify(event));
    } catch (error) {
      console.error(`Error sending message to ${userId}:`, error);
      this.handleDisconnection(userId, 1011, "Send error");
    }
  }

  /**
   * Start ping interval to keep connections alive
   */
  private startPingInterval(): void {
    this.pingInterval = setInterval(() => {
      const now = Date.now();

      this.clients.forEach((client, userId) => {
        if (client.ws.readyState === WebSocket.OPEN) {
          // Send ping if no activity for 30 seconds
          if (now - client.lastPing > 30000) {
            client.ws.ping();
          }
        }
      });
    }, 30000); // Every 30 seconds
  }

  /**
   * Start cleanup interval for dead connections
   */
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const deadConnections: string[] = [];

      this.clients.forEach((client, userId) => {
        // Mark as dead if no activity for 2 minutes
        if (
          now - client.lastPing > 120000 ||
          client.ws.readyState !== WebSocket.OPEN
        ) {
          deadConnections.push(userId);
        }
      });

      // Clean up dead connections
      deadConnections.forEach((userId) => {
        this.handleDisconnection(userId, 1001, "Timeout");
      });

      if (deadConnections.length > 0) {
        console.log(`🧹 Cleaned up ${deadConnections.length} dead connections`);
      }
    }, 60000); // Every minute
  }

  /**
   * Get connection statistics
   */
  getStats(): {
    connectedClients: number;
    activeGroups: number;
    totalGroups: number;
    uptime: number;
  } {
    return {
      connectedClients: this.clients.size,
      activeGroups: this.groups.size,
      totalGroups: Array.from(this.groups.values()).reduce(
        (sum, group) => sum + group.size,
        0
      ),
      uptime: process.uptime(),
    };
  }

  /**
   * Shutdown WebSocket service
   */
  shutdown(): void {
    console.log("🔄 Shutting down WebSocket service...");

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Close all connections
    this.clients.forEach((client, userId) => {
      client.ws.close(1001, "Server shutdown");
    });

    this.clients.clear();
    this.groups.clear();

    console.log("✅ WebSocket service shutdown complete");
  }
}
