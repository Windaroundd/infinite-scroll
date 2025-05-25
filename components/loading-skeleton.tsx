export function LoadingSkeleton() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg animate-pulse">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>

      {/* Image placeholder */}
      <div className="h-64 w-full bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
        <div className="flex space-x-4">
          <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  )
}
