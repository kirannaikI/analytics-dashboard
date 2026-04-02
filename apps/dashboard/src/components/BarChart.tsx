import React from 'react';
import styled from 'styled-components';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CategoryData } from '@utils/dataGenerator';

interface BarChartProps {
  data: CategoryData[];
  title: string;
  height?: number;
  dataKey?: string;
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
      var(--color-secondary),
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
    background: linear-gradient(135deg, var(--color-secondary), var(--color-tertiary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CustomTooltip = styled.div`
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-lg);
  
  .tooltip-label {
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }
  
  .tooltip-value {
    color: var(--color-secondary);
    font-size: 1.25rem;
    font-weight: 700;
    font-family: var(--font-mono);
  }
`;

const CustomTooltipContent: React.FC<any> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <CustomTooltip>
      <div className="tooltip-label">{data.name}</div>
      <div className="tooltip-value">
        ${data.value.toLocaleString()}
      </div>
    </CustomTooltip>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data = [],
  title,
  height = 400,
  dataKey = 'value',
}) => {
  return (
    <ChartContainer height={height}>
      <ChartTitle>
        <span>{title}</span>
      </ChartTitle>
      <ResponsiveContainer width="100%" height={height - 80}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {data.map((entry, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`bar-gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={entry.color}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={entry.color}
                  stopOpacity={0.6}
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
            dataKey="name"
            stroke="var(--color-text-muted)"
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
            }}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
            }}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltipContent />} />
          <Bar
            dataKey={dataKey}
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#bar-gradient-${index})`}
                stroke={entry.color}
                strokeWidth={2}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};