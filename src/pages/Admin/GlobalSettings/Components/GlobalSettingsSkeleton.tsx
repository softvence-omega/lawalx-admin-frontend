import { Skeleton } from "@/components/ui/skeleton";

const GlobalSettingsSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Title */}
          <Skeleton className="h-8 w-96 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Default Language */}
              <div>
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-[46px] w-full rounded-lg" />
              </div>

              {/* Default Timezone */}
              <div>
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-[46px] w-full rounded-lg" />
              </div>

              <div className="flex items-center justify-between">
                {/* Timezone Override - TOGGLE */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                {/* 2FA - TOGGLE */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              {/* Date Format & Time Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
                <div>
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-[46px] w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-[46px] w-full rounded-lg" />
                </div>
              </div>

              {/* First Day & Show relative timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-[46px] w-full rounded-lg" />
                </div>

                {/* Show relative timestamps - TOGGLE */}
                <div className="flex flex-col">
                  <div className="flex items-center mb-3 gap-1.5">
                    <Skeleton className="h-6 w-12 rounded-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-40 ml-4" />
                </div>
              </div>
            </div>

            {/* Right Column - Branding */}
            <div className="space-y-8">
              <Skeleton className="h-7 w-48" />

              {/* Client Logo + Favicon side by side */}
              <div className="flex gap-8">
                {/* Client Logo */}
                <div className="flex-1 min-w-[280px]">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center flex flex-col items-center">
                    <Skeleton className="w-10 h-10 rounded-full mb-3" />
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-40 mb-4" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                  </div>
                </div>

                {/* Favicon */}
                <div className="flex-1 min-w-[280px]">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center flex flex-col items-center">
                    <Skeleton className="w-10 h-10 rounded-full mb-3" />
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-40 mb-4" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-8">
                {/* Primary Color */}
                <div className="flex-1 min-w-[200px]">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-md" />
                    <Skeleton className="h-[46px] w-32 rounded-lg" />
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="flex-1 min-w-[200px]">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-md" />
                    <Skeleton className="h-[46px] w-32 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-8 mt-8 border-t border-gray-200">
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsSkeleton;
