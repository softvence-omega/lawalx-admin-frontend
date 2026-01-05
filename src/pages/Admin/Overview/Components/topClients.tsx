import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,

} from 'recharts';

const TopClients = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');

  // Mock data for different months
  const mockData = {
    January: [
      { name: 'Acme', usage: 1700 },
      { name: 'Global', usage: 1500 },
      { name: 'TechCorp', usage: 1300 },
      { name: 'NextGen', usage: 1150 },
      { name: 'DataPlus', usage: 1000 },
      { name: 'SoftVision', usage: 650 },
      { name: 'TigerSoft', usage: 350 }
    ],
    February: [
      { name: 'Acme', usage: 1650 },
      { name: 'Global', usage: 1450 },
      { name: 'TechCorp', usage: 1250 },
      { name: 'NextGen', usage: 1100 },
      { name: 'DataPlus', usage: 950 },
      { name: 'SoftVision', usage: 600 },
      { name: 'TigerSoft', usage: 300 }
    ],
    March: [
      { name: 'Acme', usage: 1800 },
      { name: 'Global', usage: 1550 },
      { name: 'TechCorp', usage: 1350 },
      { name: 'NextGen', usage: 1200 },
      { name: 'DataPlus', usage: 1050 },
      { name: 'SoftVision', usage: 700 },
      { name: 'TigerSoft', usage: 400 }
    ],
    April: [
      { name: 'Acme', usage: 1750 },
      { name: 'Global', usage: 1500 },
      { name: 'TechCorp', usage: 1300 },
      { name: 'NextGen', usage: 1150 },
      { name: 'DataPlus', usage: 1000 },
      { name: 'SoftVision', usage: 650 },
      { name: 'TigerSoft', usage: 350 }
    ]
  };

  const currentData = mockData[selectedMonth as keyof typeof mockData] || mockData.January;

  return (
    <div className="">
      <div className="w-full">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Top Clients by Usage</h2>
            {/* Month Filter */}
          <div className="mb-6">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
            </select>
          </div>
          </div>

          {/* Chart */}
          <div className="w-full h-80 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 2000]}
                  ticks={[0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px'
                  }}
                  itemStyle={{ color: '#374151' }}
                  cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                />
                <Bar 
                  dataKey="usage" 
                  fill="url(#gradient)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a5b4fc" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopClients;
