import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate dummy fintech data
const data = Array.from({ length: 20 }, (_, i) => ({
  name: `T-${i}`,
  value: 4000 + Math.random() * 2000 + (i * 100),
  volume: Math.random() * 1000
}));

const FintechViz: React.FC = () => {
  return (
    <div className="w-full h-64 border border-retro-green/30 bg-retro-grid/20 p-4 rounded-sm relative overflow-hidden">
      <div className="absolute top-2 left-4 text-xs text-retro-green opacity-70">
        MARKET_TREND_ANALYSIS :: SEC_COMPLIANT
      </div>
      <div className="absolute top-2 right-4 text-xs text-retro-accent font-bold animate-pulse">
        LIVE_FEED
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0a2e0a" />
          <XAxis dataKey="name" hide />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#050505', borderColor: '#00ff41', color: '#00ff41' }}
            itemStyle={{ color: '#00ff41' }}
            cursor={{ stroke: '#00ff41', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#00ff41" 
            fill="rgba(0, 255, 65, 0.1)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FintechViz;