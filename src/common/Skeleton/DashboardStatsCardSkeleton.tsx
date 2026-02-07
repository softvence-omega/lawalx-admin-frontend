import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const DashboardStatsCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-[160px] w-full", className)}>
      <div className="h-full rounded-xl flex flex-col border border-[#CAD2DB] bg-gray-50/30">
        <div className="bg-white shadow-xs shadow-gray-100 rounded-xl p-5">
          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-5 w-32 rounded" />
          </div>

          {/* Value and growth */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </div>
        {/* Description & Link */}
        <div className="flex-grow flex items-center justify-between px-6 py-4">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCardSkeleton;
