'use client'

// Error boundary for handling runtime errors
// Shows user-friendly error message with recovery option

import { useEffect } from 'react'
import { logger } from '@/lib/logger'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    logger.error(error, { digest: error.digest })
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-400 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-display text-7xl text-base-500 mb-4">ERROR</h1>
          <div className="w-24 h-1 bg-base-500 mx-auto mb-6" />
          <h2 className="font-mono text-2xl text-base-100 mb-4 uppercase tracking-wider">
            System Malfunction
          </h2>
          <p className="font-body text-base-200 leading-relaxed">
            Something went wrong. The system encountered an unexpected error.
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="px-8 py-4 bg-base-500 text-base-400 font-mono text-sm uppercase tracking-widest hover:bg-base-100 transition-colors"
        >
          Retry Operation
        </button>

        {error.digest && (
          <p className="mt-6 font-mono text-xs text-base-300">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
