const CardSkeleton = () => {
  return (
    <div className="rounded-xl bg-gray-100/60 animate-pulse">
      {/* Card Body */}
      <div className="p-5 border rounded-xl border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {/* Icon skeleton */}
          <div className="w-12 h-12 rounded-xl bg-gray-200" />

          {/* Title skeleton */}
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
        </div>

        {/* Value & Growth */}
        <div className="flex items-center justify-between">
          {/* Value */}
          <div className="h-10 w-24 bg-gray-200 rounded-md" />

          {/* Growth badge */}
          <div className="h-6 w-16 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-5">
        <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default CardSkeleton;
