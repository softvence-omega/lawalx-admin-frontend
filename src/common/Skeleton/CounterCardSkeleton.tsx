import { Skeleton } from "@/components/ui/skeleton";

const CounterCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 w-full animate-pulse">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-5 w-24 rounded" />
      </div>

      {/* Count */}
      <Skeleton className="h-10 w-20 mt-4 rounded" />
    </div>
  );
};

export default CounterCardSkeleton;
