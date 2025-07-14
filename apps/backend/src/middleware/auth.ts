import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../index";
import { createError } from "./errorHandler";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    stellar_public_key?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      throw createError("Access token required", 401);
    }

    // Verify Supabase JWT token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw createError("Invalid token", 401);
    }

    // Ensure user exists in our users table
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id, email, stellar_public_key, full_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (userError && userError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected for new users
      throw createError("Error checking user", 500);
    }

    // If user doesn't exist in our users table, create them
    if (!existingUser) {
      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,
        email: user.email || "",
        full_name:
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Usuario",
        email_verified: user.email_confirmed_at ? true : false,
      });

      if (insertError) {
        console.error("Error creating user record:", insertError);
        throw createError("Error creating user record", 500);
      }
    }

    // Get updated user info after potential creation
    const { data: finalUser } = await supabase
      .from("users")
      .select("id, email, stellar_public_key, full_name, avatar_url")
      .eq("id", user.id)
      .single();

    // Add user info to request
    req.user = {
      id: user.id,
      email: user.email || "",
      stellar_public_key: finalUser?.stellar_public_key || undefined,
      full_name: finalUser?.full_name || undefined,
      avatar_url: finalUser?.avatar_url || undefined,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireAuth = authenticateToken;
