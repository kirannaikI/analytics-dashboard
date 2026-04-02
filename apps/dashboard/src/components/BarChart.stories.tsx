import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/BarChart',
  component: BarChart,
};
export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {};
