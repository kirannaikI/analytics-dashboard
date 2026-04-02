import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';
import { Provider } from 'react-redux';
import { store } from '@store/index';

const meta = {
  title: 'Components/LineChart',
  component: LineChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ width: '100%', height: '500px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  { date: '2024-01-01', revenue: 12000, users: 450, conversion: 3.2, orders: 234 },
  { date: '2024-01-02', revenue: 15000, users: 520, conversion: 3.5, orders: 289 },
  { date: '2024-01-03', revenue: 13500, users: 490, conversion: 3.1, orders: 256 },
  { date: '2024-01-04', revenue: 18000, users: 610, conversion: 4.2, orders: 345 },
  { date: '2024-01-05', revenue: 16500, users: 580, conversion: 3.8, orders: 312 },
  { date: '2024-01-06', revenue: 19200, users: 650, conversion: 4.5, orders: 378 },
  { date: '2024-01-07', revenue: 17800, users: 620, conversion: 4.0, orders: 340 },
  { date: '2024-01-08', revenue: 21000, users: 720, conversion: 4.8, orders: 420 },
  { date: '2024-01-09', revenue: 19500, users: 680, conversion: 4.3, orders: 390 },
  { date: '2024-01-10', revenue: 22500, users: 780, conversion: 5.1, orders: 456 },
];

export const AllMetrics: Story = {
  args: {
    data: mockData,
    selectedMetrics: ['revenue', 'users', 'conversion', 'orders'],
    height: 400,
  },
};

export const RevenueOnly: Story = {
  args: {
    data: mockData,
    selectedMetrics: ['revenue'],
    height: 400,
  },
};

export const UsersAndConversion: Story = {
  args: {
    data: mockData,
    selectedMetrics: ['users', 'conversion'],
    height: 400,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 200 }, (_, i) => ({
      date: `2024-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 30) + 1).padStart(2, '0')}`,
      revenue: 10000 + Math.random() * 15000,
      users: 400 + Math.random() * 400,
      conversion: 2 + Math.random() * 4,
      orders: 200 + Math.random() * 300,
    })),
    selectedMetrics: ['revenue', 'users'],
    height: 400,
  },
};