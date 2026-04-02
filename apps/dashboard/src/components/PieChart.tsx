import React, { useState } from 'react';
import styled from 'styled-components';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import { CategoryData } from '@utils/dataGenerator';

interface PieChartProps {
  data: CategoryData[];
  title: string;
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
      var(--color-tertiary),
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
  text-align: center;
  
  span {
    background: linear-gradient(135deg, var(--color-tertiary), var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
`;

const LegendItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'var(--color-border-focus)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }
  
  .color-box {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
    box-shadow: 0 0 10px currentColor;
  }
  
  .legend-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    .name {
      font-size: 0.875rem;
      color: var(--color-text-primary);
      font-weight: 500;
    }
    
    .value {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      font-family: var(--font-mono);
    }
  }
`;

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0 0 10px ${fill})`,
        }}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

export const PieChart: React.FC<PieChartProps> = ({
  data = [],
  title,
  height = 400,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ChartContainer height={height}>
      <ChartTitle>
        <span>{title}</span>
      </ChartTitle>
      <ResponsiveContainer width="100%" height={height - 150}>
        <RechartsPieChart>
          <Pie
            activeIndex={activeIndex !== null ? activeIndex : undefined}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                strokeWidth={2}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      <Legend>
        {data.map((item, index) => (
          <LegendItem
            key={item.name}
            active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="color-box"
              style={{ background: item.color, color: item.color }}
            />
            <div className="legend-text">
              <div className="name">{item.name}</div>
              <div className="value">
                ${item.value.toLocaleString()} ({((item.value / total) * 100).toFixed(1)}%)
              </div>
            </div>
          </LegendItem>
        ))}
      </Legend>
    </ChartContainer>
  );
};