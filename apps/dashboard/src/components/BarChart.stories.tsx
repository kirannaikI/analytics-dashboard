import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const mockData = [
  { name: 'United States', value: 450000, color: '#00f0ff' },
  { name: 'Canada', value: 320000, color: '#ff00e5' },
  { name: 'United Kingdom', value: 180000, color: '#ffea00' },
  { name: 'Germany', value: 240000, color: '#00ff88' },
  { name: 'France', value: 150000, color: '#ff4466' },
];

const meta: Meta<typeof BarChart> = {
  title: 'Components/BarChart',
  component: BarChart,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {
    data: mockData,
    title: 'Top Countries by Revenue',
    height: 400,
  },
};
