import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@utils/dataGenerator';

interface LineChartProps {
  data: ChartDataPoint[];
  selectedMetrics: string[];
  height?: number;
}

const ChartContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-primary),
      transparent
    );
    animation: shimmer 3s ease-in-out infinite;
  }
`;

const ChartTitle = styled.h3`
  margin-bottom: var(--spacing-md);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  
  span {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CustomTooltip = styled.div`
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-lg);
  
  .tooltip-label {
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
  
  .tooltip-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-xs) 0;
    font-size: 0.875rem;
    
    .color-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .metric-name {
      color: var(--color-text-secondary);
      text-transform: capitalize;
    }
    
    .metric-value {
      font-weight: 600;
      color: var(--color-text-primary);
      margin-left: auto;
    }
  }
`;

const metricColors: Record<string, string> = {
  revenue: '#00f0ff',
  users: '#ff00e5',
  conversion: '#ffea00',
  orders: '#00ff88',
};

const metricFormats: Record<string, (value: number) => string> = {
  revenue: (value) => `$${value.toLocaleString()}`,
  users: (value) => value.toLocaleString(),
  conversion: (value) => `${value.toFixed(2)}%`,
  orders: (value) => value.toLocaleString(),
};

const CustomTooltipContent: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <CustomTooltip>
      <div className="tooltip-label">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="tooltip-item">
          <div 
            className="color-dot" 
            style={{ background: entry.color }}
          />
          <span className="metric-name">{entry.name}</span>
          <span className="metric-value">
            {metricFormats[entry.name]?.(entry.value) || entry.value}
          </span>
        </div>
      ))}
    </CustomTooltip>
  );
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  selectedMetrics,
  height = 400,
}) => {
  const chartData = useMemo(() => {
    // Sample data if too large for smooth rendering
    if (data.length > 100) {
      const step = Math.ceil(data.length / 100);
      return data.filter((_, index) => index % step === 0);
    }
    return data;
  }, [data]);

  return (
    <ChartContainer height={height}>
      <ChartTitle>
        <span>Performance Trends</span>
      </ChartTitle>
      <ResponsiveContainer width="100%" height={height - 80}>
        <RechartsLineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {selectedMetrics.map((metric) => (
              <linearGradient
                key={metric}
                id={`gradient-${metric}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={metricColors[metric]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={metricColors[metric]}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="var(--color-text-muted)"
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
            }}
            tickLine={false}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
            }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltipContent />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '0.875rem',
            }}
          />
          {selectedMetrics.map((metric) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={metricColors[metric]}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: metricColors[metric],
                stroke: 'var(--color-bg-primary)',
                strokeWidth: 2,
              }}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};