import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Revenue: Story = {
  args: {
    title: 'Total Revenue',
    value: '$1,234,567',
    subtitle: 'Compared to last month',
    icon: FiDollarSign,
    trend: { value: 12.5, isPositive: true },
    color: '#00f0ff',
  },
};

export const Users: Story = {
  args: {
    title: 'Active Users',
    value: '45,678',
    subtitle: 'Current active sessions',
    icon: FiUsers,
    trend: { value: 5.2, isPositive: true },
    color: '#ff00e5',
  },
};

export const NegativeTrend: Story = {
  args: {
    title: 'Conversion Rate',
    value: '3.4%',
    subtitle: 'Down from last week',
    icon: FiTrendingUp,
    trend: { value: 1.2, isPositive: false },
    color: '#ff4466',
  },
};