import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const Card = styled.div<{ color: string }>`
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: ${props => props.color};
    
    &::before {
      opacity: 0.1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: ${props => props.color};
    opacity: 0.05;
    border-radius: 50%;
    transform: translate(30%, -30%);
    transition: opacity var(--transition-base);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
`;

const Title = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: ${props => props.color}20;
  color: ${props => props.color};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-mono);
  letter-spacing: -0.02em;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
`;

const Subtitle = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-muted);
`;

const Trend = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  color: ${props => props.isPositive ? 'var(--color-success)' : 'var(--color-error)'};
  padding: 4px 8px;
  border-radius: var(--radius-full);
  background: ${props => props.isPositive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 102, 0.1)'};
  border: 1px solid currentColor;
`;

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'var(--color-primary)',
}) => {
  return (
    <Card color={color}>
      <Header>
        <Title>{title}</Title>
        <IconWrapper color={color}>
          <Icon />
        </IconWrapper>
      </Header>
      <Value>{value}</Value>
      <Footer>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {trend && (
          <Trend isPositive={trend.isPositive}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </Trend>
        )}
      </Footer>
    </Card>
  );
};