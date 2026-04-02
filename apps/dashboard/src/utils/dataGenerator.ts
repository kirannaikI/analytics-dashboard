import { TableRow } from '@store/tableSlice';

const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
  'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
  'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Avery', 'Sebastian'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy',
  'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Switzerland', 'Austria',
  'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico', 'Argentina', 'Chile'
];

const products = [
  'Pro Subscription', 'Enterprise License', 'Starter Pack', 'Premium Bundle', 'Basic Plan',
  'Advanced Tools', 'Developer Kit', 'Business Suite', 'Analytics Pro', 'Cloud Storage',
  'API Access', 'Mobile App', 'Desktop Software', 'Training Course', 'Consulting Services',
  'Support Package', 'Integration Module', 'Security Suite', 'Backup Solution', 'Monitoring Tools'
];

const categories = [
  'Software', 'Services', 'Training', 'Consulting', 'Support', 'Hardware', 'Cloud', 'Security'
];

const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomItem = <T,>(array: T[]): T => {
  return array[random(0, array.length - 1)];
};

const generateEmail = (firstName: string, lastName: string): string => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'business.io'];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomItem(domains)}`;
};

const generateDate = (): string => {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split('T')[0];
};

export const generateMockData = (count: number): TableRow[] => {
  const data: TableRow[] = [];
  
  console.time('Data Generation');
  
  for (let i = 0; i < count; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    
    data.push({
      id: `row-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      revenue: random(100, 50000),
      status: randomItem(statuses),
      date: generateDate(),
      country: randomItem(countries),
      product: randomItem(products),
      quantity: random(1, 100),
      category: randomItem(categories),
    });
  }
  
  console.timeEnd('Data Generation');
  
  return data;
};

// Generate aggregated chart data from table data
export interface ChartDataPoint {
  date: string;
  revenue: number;
  users: number;
  conversion: number;
  orders: number;
}

export const generateChartData = (tableData: TableRow[]): ChartDataPoint[] => {
  // Group by date and aggregate
  const grouped = tableData.reduce((acc, row) => {
    if (!acc[row.date]) {
      acc[row.date] = {
        date: row.date,
        revenue: 0,
        users: 0,
        conversion: 0,
        orders: 0,
      };
    }
    
    acc[row.date].revenue += row.revenue;
    acc[row.date].users += 1;
    acc[row.date].orders += row.quantity;
    
    return acc;
  }, {} as Record<string, ChartDataPoint>);

  // Calculate conversion rates
  Object.values(grouped).forEach(point => {
    point.conversion = (point.orders / point.users) * 100;
  });

  // Sort by date
  return Object.values(grouped).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

// Generate category distribution for pie charts
export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const categoryColors: Record<string, string> = {
  Software: '#00f0ff',
  Services: '#ff00e5',
  Training: '#ffea00',
  Consulting: '#00ff88',
  Support: '#ff4466',
  Hardware: '#8b5cf6',
  Cloud: '#3b82f6',
  Security: '#f59e0b',
};

export const generateCategoryData = (tableData: TableRow[]): CategoryData[] => {
  const categoryTotals = tableData.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] || 0) + row.revenue;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name] || '#6b7d94',
  }));
};

// Generate country distribution for geographical analysis
export const generateCountryData = (tableData: TableRow[]): CategoryData[] => {
  const countryTotals = tableData.reduce((acc, row) => {
    acc[row.country] = (acc[row.country] || 0) + row.revenue;
    return acc;
  }, {} as Record<string, number>);

  // Sort and take top 10
  const sorted = Object.entries(countryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const colors = [
    '#00f0ff', '#ff00e5', '#ffea00', '#00ff88', '#ff4466',
    '#8b5cf6', '#3b82f6', '#f59e0b', '#ef4444', '#10b981'
  ];

  return sorted.map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
  }));
};