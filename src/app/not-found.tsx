// 404 Not Found page
// Custom error page for missing routes

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-400 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-display text-9xl text-base-500 mb-4">404</h1>
          <div className="w-24 h-1 bg-base-500 mx-auto mb-6" />
          <h2 className="font-mono text-2xl text-base-100 mb-4 uppercase tracking-wider">
            Target Not Found
          </h2>
          <p className="font-body text-base-200 leading-relaxed">
            The requested resource could not be located in the system database.
          </p>
        </div>

        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-base-500 text-base-400 font-mono text-sm uppercase tracking-widest hover:bg-base-100 transition-colors"
        >
          Return to Base
        </Link>
      </div>
    </div>
  )
}
