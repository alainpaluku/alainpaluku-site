/**
 * Utilitaire de logging structuré
 */

type LogLevel = "info" | "success" | "warning" | "error";

interface LogContext {
  [key: string]: unknown;
}

function formatLog(level: LogLevel, message: string, context?: LogContext): string {
  const emoji = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };
  
  const prefix = `${emoji[level]} [${level.toUpperCase()}]`;
  const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : "";
  
  return `${prefix} ${message}${contextStr}`;
}

export const logger = {
  info: (message: string, context?: LogContext) => {
    console.log(formatLog("info", message, context));
  },
  
  success: (message: string, context?: LogContext) => {
    console.log(formatLog("success", message, context));
  },
  
  warning: (message: string, context?: LogContext) => {
    console.warn(formatLog("warning", message, context));
  },
  
  error: (message: string, context?: LogContext) => {
    console.error(formatLog("error", message, context));
  },
};
