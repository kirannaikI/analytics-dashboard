import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/StatCard';
import { FiDollarSign } from 'react-icons/fi';

describe('StatCard', () => {
  it('renders title and value correctly', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$2.4M"
        icon={FiDollarSign}
        color="#00f0ff"
      />
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$2.4M')).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$2.4M"
        subtitle="All time"
        icon={FiDollarSign}
        color="#00f0ff"
      />
    );

    expect(screen.getByText('All time')).toBeInTheDocument();
  });

  it('displays positive trend correctly', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$2.4M"
        icon={FiDollarSign}
        trend={{ value: 12.5, isPositive: true }}
        color="#00f0ff"
      />
    );

    const trendElement = screen.getByText(/12.5%/);
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent('↑');
  });

  it('displays negative trend correctly', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$2.4M"
        icon={FiDollarSign}
        trend={{ value: 5.2, isPositive: false }}
        color="#00f0ff"
      />
    );

    const trendElement = screen.getByText(/5.2%/);
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent('↓');
  });

  it('does not display trend when not provided', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$2.4M"
        icon={FiDollarSign}
        color="#00f0ff"
      />
    );

    expect(screen.queryByText(/↑/)).not.toBeInTheDocument();
    expect(screen.queryByText(/↓/)).not.toBeInTheDocument();
  });
});