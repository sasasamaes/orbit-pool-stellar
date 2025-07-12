import { Request, Response, NextFunction } from "express";
import { createError } from "./errorHandler";

export const validateNotificationData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, message, type, user_id } = req.body;

  if (!title || !message || !type || !user_id) {
    return next(
      createError("Title, message, type, and user_id are required", 400)
    );
  }

  if (typeof title !== "string" || title.trim().length === 0) {
    return next(createError("Title must be a non-empty string", 400));
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return next(createError("Message must be a non-empty string", 400));
  }

  const validTypes = ["info", "success", "warning", "error", "system"];
  if (!validTypes.includes(type)) {
    return next(
      createError(`Type must be one of: ${validTypes.join(", ")}`, 400)
    );
  }

  next();
};

export const validatePreferences = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email_notifications, push_notifications, sms_notifications } =
    req.body;

  if (
    email_notifications !== undefined &&
    typeof email_notifications !== "boolean"
  ) {
    return next(createError("email_notifications must be a boolean", 400));
  }

  if (
    push_notifications !== undefined &&
    typeof push_notifications !== "boolean"
  ) {
    return next(createError("push_notifications must be a boolean", 400));
  }

  if (
    sms_notifications !== undefined &&
    typeof sms_notifications !== "boolean"
  ) {
    return next(createError("sms_notifications must be a boolean", 400));
  }

  next();
};
