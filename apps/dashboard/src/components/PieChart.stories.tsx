import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta = {
  title: 'Components/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const categoryData = [
  { name: 'Software', value: 450000, color: '#00f0ff' },
  { name: 'Services', value: 320000, color: '#ff00e5' },
  { name: 'Training', value: 180000, color: '#ffea00' },
  { name: 'Consulting', value: 240000, color: '#00ff88' },
  { name: 'Support', value: 150000, color: '#ff4466' },
  { name: 'Hardware', value: 90000, color: '#8b5cf6' },
  { name: 'Cloud', value: 280000, color: '#3b82f6' },
  { name: 'Security', value: 200000, color: '#f59e0b' },
];

export const CategoryDistribution: Story = {
  args: {
    data: categoryData,
    title: 'Revenue by Category',
    height: 450,
  },
};

export const FewCategories: Story = {
  args: {
    data: [
      { name: 'Product A', value: 500000, color: '#00f0ff' },
      { name: 'Product B', value: 350000, color: '#ff00e5' },
      { name: 'Product C', value: 250000, color: '#ffea00' },
    ],
    title: 'Top 3 Products',
    height: 450,
  },
};

export const ManyCategories: Story = {
  args: {
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `Category ${i + 1}`,
      value: Math.floor(50000 + Math.random() * 200000),
      color: `hsl(${(i * 30) % 360}, 70%, 60%)`,
    })),
    title: 'All Categories',
    height: 450,
  },
};