import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { FiDollarSign, FiUsers, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Revenue: Story = {
  args: {
    title: 'Total Revenue',
    value: '$2.4M',
    subtitle: 'All time',
    icon: FiDollarSign,
    trend: { value: 12.5, isPositive: true },
    color: '#00f0ff',
  },
};

export const Users: Story = {
  args: {
    title: 'Active Users',
    value: '45,231',
    subtitle: 'Unique customers',
    icon: FiUsers,
    trend: { value: 8.3, isPositive: true },
    color: '#ff00e5',
  },
};

export const Orders: Story = {
  args: {
    title: 'Total Orders',
    value: '12,456',
    subtitle: 'Completed transactions',
    icon: FiShoppingCart,
    trend: { value: 15.7, isPositive: true },
    color: '#ffea00',
  },
};

export const Declining: Story = {
  args: {
    title: 'Conversion Rate',
    value: '3.2%',
    subtitle: 'Last 30 days',
    icon: FiTrendingUp,
    trend: { value: 2.1, isPositive: false },
    color: '#ff4466',
  },
};

export const NoTrend: Story = {
  args: {
    title: 'Average Order Value',
    value: '$124.50',
    subtitle: 'Per transaction',
    icon: FiDollarSign,
    color: '#00ff88',
  },
};