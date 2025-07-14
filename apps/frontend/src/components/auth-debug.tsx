"use client";

import { useAuth } from "@/components/providers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Shield, AlertCircle } from "lucide-react";

export function AuthDebug() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Checking Authentication...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Authentication Status</span>
        </CardTitle>
        <CardDescription>Current user authentication state</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={user ? "default" : "destructive"}>
            {user ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </div>

        {user ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">User ID: {user.id}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Email: {user.email}
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Please sign in to continue</span>
            </div>
            <Button
              onClick={() => (window.location.href = "/auth/login")}
              size="sm"
            >
              Go to Login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
