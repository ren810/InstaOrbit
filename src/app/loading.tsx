// Loading UI for Suspense boundaries
// Displays while page content is being loaded

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-400">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Ring 1 */}
        <div className="absolute inset-0 border-l-2 border-r-2 border-base-500 rounded-full animate-[spin_1s_linear_infinite]" />
        
        {/* Ring 2 */}
        <div className="absolute inset-4 border-t-2 border-b-2 border-base-200 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Disc */}
        <div className="absolute w-32 h-32 border border-base-500/30 rounded-full animate-[spin_3s_linear_infinite] flex items-center justify-center">
            <div className="w-2 h-2 bg-base-500 rounded-full" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-xs text-base-200 tracking-[0.2em] uppercase">
            Loading
          </span>
        </div>
      </div>
    </div>
  )
}
