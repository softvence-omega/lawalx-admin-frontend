import React from 'react';
import { BounceRateData } from '../dataService';

interface BarChartProps {
  data: BounceRateData[];
  height?: number;
  width?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 350, width = 450 }) => {
  const padding = { top: 20, right: 30, bottom: 60, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Adjusted bar widths: Engaged is wider than Bounced
  const engagedWidth = (chartWidth / data.length) * 0.35;
  const bouncedWidth = (chartWidth / data.length) * 0.2;
  const gap = 4;

  return (
    <div className="w-full h-[400px]">
      <div className="flex items-center space-x-6 mb-8 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
          <span className="text-gray-500 font-medium">Engaged</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#E0D7FF]"></div>
          <span className="text-gray-500 font-medium">Bounced</span>
        </div>
      </div>
      <div className="relative">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="engagedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="bouncedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EDE9FE" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 10, 20, 40, 60, 80, 100].map((value, index) => (
            <g key={index}>
              <line
                x1={padding.left}
                y1={height - padding.bottom - (value / 100) * chartHeight}
                x2={width - padding.right}
                y2={height - padding.bottom - (value / 100) * chartHeight}
                stroke="#F1F5F9"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 15}
                y={height - padding.bottom - (value / 100) * chartHeight + 4}
                textAnchor="end"
                fontSize="11"
                fill="#94A3B8"
                fontFamily="Inter, sans-serif"
              >
                {value}%
              </text>
            </g>
          ))}
          
          {/* Bars */}
          {data.map((item, index) => {
            const groupWidth = chartWidth / data.length;
            const xBase = padding.left + (index * groupWidth) + (groupWidth * 0.1);
            
            const engagedH = (item.engaged / 100) * chartHeight;
            const bouncedH = (item.bounced / 100) * chartHeight;
            
            return (
              <g key={index}>
                {/* Engaged bar */}
                <rect
                  x={xBase}
                  y={height - padding.bottom - engagedH}
                  width={engagedWidth}
                  height={engagedH}
                  fill="url(#engagedGradient)"
                  rx="3"
                />
                {/* Bounced bar */}
                <rect
                  x={xBase + engagedWidth + gap}
                  y={height - padding.bottom - bouncedH}
                  width={bouncedWidth}
                  height={bouncedH}
                  fill="url(#bouncedGradient)"
                  rx="3"
                />
                {/* Month label */}
                <text
                  x={xBase + (engagedWidth + gap + bouncedWidth) / 2}
                  y={height - 35}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748B"
                  fontFamily="Inter, sans-serif"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Scroll Indicator Simulation */}
        {/* <div className="absolute bottom-1 left-[50px] right-[30px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-[#94A3B8] rounded-full"></div>
        </div> */}
      </div>
    </div>
  );
};

export default BarChart;