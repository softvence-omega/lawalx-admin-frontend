import { Skeleton } from "@/components/ui/skeleton";
import CounterCardSkeleton from "@/common/Skeleton/CounterCardSkeleton";

const ClientsSkeleton = () => {
  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap gap-5 mt-11">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <CounterCardSkeleton key={index} />
          ))}
      </div>
      <div className="space-y-6 mt-11">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
          <h2 className="text-xl font-medium text-transparent bg-gray-200 rounded-md animate-pulse w-40">
            Customer Insight
          </h2>
          <div className="flex items-center gap-3">
            {/* Mimic Buttons */}
            <div className="h-10 w-28 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-10 w-28 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-10 w-28 bg-gray-100 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Board View Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 shadow-sm rounded-xl p-0 overflow-hidden min-w-[300px] bg-white"
              >
                <div className="space-y-4 pt-6">
                  {/* Header */}
                  <div className="flex items-start justify-between px-6">
                    <div className="flex items-center gap-3">
                      {/* Icon Skeleton */}
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>

                  <hr className="my-6 border border-gray-200" />

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-x-18 gap-y-5 px-6">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>

                  {/* Storage */}
                  <div className="space-y-2 px-6 py-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>

                  {/* Button */}
                  <div className="px-6 pb-6">
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ClientsSkeleton;
