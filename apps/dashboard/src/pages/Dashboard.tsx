import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  setData,
  setSortBy,
  setFilter,
  setSearchQuery,
  clearAllFilters,
  selectProcessedData,
  selectPaginatedData,
} from '@store/tableSlice';
import {
  generateMockData,
  generateChartData,
  generateCategoryData,
  generateCountryData,
} from '@utils/dataGenerator';
import { LineChart } from '@components/LineChart';
import { BarChart } from '@components/BarChart';
import { PieChart } from '@components/PieChart';
import { VirtualizedTable } from '@/components/VirtualizedTable';
import { FilterControls } from '@components/FilterControls';
import { StatCard } from '@components/StatCard';
import {
  FiDollarSign,
  FiUsers,
  FiShoppingCart,
  FiTrendingUp,
  FiDatabase,
  FiActivity,
} from 'react-icons/fi';

const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-2xl);
  max-width: 1800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
`;

const Header = styled.header`
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn 0.8s ease-out 0.2s both;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn 1s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableSection = styled.section`
  animation: fadeIn 1.2s ease-out 0.6s both;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  .icon {
    color: var(--color-primary);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeOut 0.5s ease-out 2s forwards;
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const LoadingText = styled.div`
  margin-top: var(--spacing-lg);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-align: center;
  
  .highlight {
    color: var(--color-primary);
    font-family: var(--font-mono);
  }
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const rawData = useAppSelector((state) => state.table.rawData);
  const processedData = useAppSelector(selectProcessedData);
  const paginatedData = useAppSelector(selectPaginatedData);
  const filters = useAppSelector((state) => state.table.filters);
  const searchQuery = useAppSelector((state) => state.table.searchQuery);
  const sortBy = useAppSelector((state) => state.table.sortBy);
  const sortDirection = useAppSelector((state) => state.table.sortDirection);
  const selectedMetrics = useAppSelector((state) => state.dashboard.selectedMetrics);

  // Initialize data
  useEffect(() => {
    const mockData = generateMockData(100000); // 100k rows
    dispatch(setData(mockData));
    setIsLoading(false);
  }, [dispatch]);

  // Calculate chart data
  const chartData = useMemo(() => {
    if (!rawData.length) return [];
    return generateChartData(rawData);
  }, [rawData]);

  const categoryData = useMemo(() => {
    if (!processedData.length) return [];
    return generateCategoryData(processedData);
  }, [processedData]);

  const countryData = useMemo(() => {
    if (!processedData.length) return [];
    return generateCountryData(processedData);
  }, [processedData]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    if (!processedData.length) {
      return {
        totalRevenue: 0,
        totalUsers: 0,
        totalOrders: 0,
        avgOrderValue: 0,
      };
    }

    const totalRevenue = processedData.reduce((sum, row) => sum + row.revenue, 0);
    const totalUsers = processedData.length;
    const totalOrders = processedData.reduce((sum, row) => sum + row.quantity, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    return {
      totalRevenue,
      totalUsers,
      totalOrders,
      avgOrderValue,
    };
  }, [processedData]);

  const handleSortChange = (columnId: string) => {
    dispatch(setSortBy(columnId));
  };

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ key, value }));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
  };

  if (isLoading) {
    return (
      <LoadingOverlay>
        <Spinner />
        <LoadingText>
          Generating <span className="highlight">100,000</span> rows of data...
        </LoadingText>
      </LoadingOverlay>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Analytics Dashboard</Title>
        <Subtitle>
          Real-time performance metrics and data visualization
        </Subtitle>
      </Header>

      <StatsGrid>
        <StatCard
          title="Total Revenue"
          value={`$${(kpis.totalRevenue / 1000000).toFixed(2)}M`}
          subtitle="All time"
          icon={FiDollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="var(--color-primary)"
        />
        <StatCard
          title="Active Users"
          value={kpis.totalUsers.toLocaleString()}
          subtitle="Unique customers"
          icon={FiUsers}
          trend={{ value: 8.3, isPositive: true }}
          color="var(--color-secondary)"
        />
        <StatCard
          title="Total Orders"
          value={kpis.totalOrders.toLocaleString()}
          subtitle="Completed transactions"
          icon={FiShoppingCart}
          trend={{ value: 15.7, isPositive: true }}
          color="var(--color-tertiary)"
        />
        <StatCard
          title="Avg Order Value"
          value={`$${kpis.avgOrderValue.toFixed(2)}`}
          subtitle="Per transaction"
          icon={FiTrendingUp}
          trend={{ value: 3.2, isPositive: false }}
          color="var(--color-success)"
        />
      </StatsGrid>

      <ChartsGrid>
        <LineChart
          data={chartData}
          selectedMetrics={selectedMetrics}
          height={400}
        />
        <PieChart
          data={categoryData}
          title="Revenue by Category"
          height={400}
        />
      </ChartsGrid>

      <ChartsGrid>
        <BarChart
          data={countryData}
          title="Top Countries by Revenue"
          height={400}
        />
      </ChartsGrid>

      <TableSection>
        <SectionTitle>
          <FiDatabase className="icon" />
          Data Table
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
            <FiActivity style={{ marginRight: '4px' }} />
            Handling 100,000 rows with virtualization
          </span>
        </SectionTitle>

        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalRows={rawData.length}
          filteredRows={processedData.length}
        />

        <VirtualizedTable
          data={processedData}
          onSortChange={handleSortChange}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      </TableSection>
    </Container>
  );
};