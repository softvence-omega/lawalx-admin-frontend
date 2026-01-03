    import { TrendingUp, TrendingDown } from "lucide-react";
    import { JSX } from "react";

    interface BillingStatsCardProps {
    title: string;
    value: string | number;
    growth?: string;
    growth_type?: "up" | "down";
    description?: string;
    icon: JSX.Element;
    icon_bg_color: string;
    }

    const BillingStatsCard = ({ item }: { item: BillingStatsCardProps }) => {
    const {
        title,
        value,
        growth,
        growth_type,
        description,
        icon,
        icon_bg_color,
    } = item;
    const isGrowthUp = growth_type === "up";

    return (
        <div
        className={`rounded-xl ${
            growth_type === "up" ? "bg-green-100/50" : "bg-red-100/50"
        } shadow-sm transition-transform duration-300 hover:scale-[1.02]`}
        >
        <div className="p-5 border rounded-xl border-gray-200 bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
            <div
                className="p-3 rounded-xl text-white"
                style={{ backgroundColor: icon_bg_color }}
            >
                {icon}
            </div>
            <h3 className="text-gray-700 font-semibold text-base">{title}</h3>
            </div>
            {/* Value & Growth */}
            <div className="flex items-center justify-between">
            <span className="text-4xl font-medium text-gray-900">{value}</span>

            {growth && (
                <span
                className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md ${
                    isGrowthUp
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
                >
                {growth}
                {isGrowthUp ? (
                    <TrendingUp className="w-4 h-4" />
                ) : (
                    <TrendingDown className="w-4 h-4" />
                )}
                </span>
            )}
            </div>
        </div>

        {/* Footer */}
        <div className={`px-5 py-5 text-sm text-gray-600`}>
            {description || ""}
        </div>
        </div>
    );
    };

    export default BillingStatsCard;
