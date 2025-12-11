// Error logging utility

interface LogContext {
  [key: string]: any;
}

export const logger = {
  error: (error: Error | string, context?: LogContext) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'string' ? undefined : error.stack;

    if (process.env.NODE_ENV === 'production') {
      // In production, send to error tracking service (Sentry, LogRocket, etc.)
      // For now, we'll just log it
      console.error('[ERROR]', errorMessage, { context, stack: errorStack });
      
      // TODO: Send to error tracking service
      // Example with Sentry:
      // Sentry.captureException(error, { extra: context });
    } else {
      // In development, log to console
      console.error('[ERROR]', errorMessage, context);
      if (errorStack) console.error(errorStack);
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[WARN]', message, context);
    } else {
      console.warn('[WARN]', message, context);
    }
  },

  info: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[INFO]', message, context);
    }
  },

  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEBUG]', message, context);
    }
  }
};
