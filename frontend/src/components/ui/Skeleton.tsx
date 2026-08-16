export function CardSkeleton() {
  return (
    <div className="rounded-2xl glass-card h-72 animate-pulse p-4 flex flex-col justify-end">
      <div className="h-4 bg-ceylon-800/60 rounded w-1/3 mb-2" />
      <div className="h-6 bg-ceylon-700/60 rounded w-2/3 mb-2" />
      <div className="h-3 bg-ceylon-900/60 rounded w-full" />
    </div>
  );
}
