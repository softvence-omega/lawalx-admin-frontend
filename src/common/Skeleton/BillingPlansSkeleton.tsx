const BillingPlansSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Stats Section Skeleton */}
      <div className="pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-40 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
              <div className="h-10 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => (
                <tr key={row} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 bg-gray-200 rounded-md w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 bg-gray-200 rounded-md w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="flex items-center space-x-1">
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded"></div>
              ))}
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPlansSkeleton;
