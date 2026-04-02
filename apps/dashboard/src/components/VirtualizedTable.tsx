import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { TableRow } from '@store/tableSlice';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface VirtualizedTableProps {
  data: TableRow[];
  onSortChange?: (columnId: string) => void;
  sortBy?: string | null;
  sortDirection?: 'asc' | 'desc';
}

const TableContainer = styled.div`
  width: 100%;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--color-primary),
      var(--color-secondary),
      var(--color-primary)
    );
    animation: shimmer 3s ease-in-out infinite;
  }
`;

const TableWrapper = styled.div`
  overflow: auto;
  max-height: 600px;
  position: relative;
`;

const Table = styled.div`
  width: 100%;
  display: grid;
`;

const TableHeader = styled.div`
  display: contents;
`;

const HeaderCell = styled.div<{ canSort?: boolean }>`
  padding: var(--spacing-md);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
  border-bottom: 2px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: ${props => props.canSort ? 'pointer' : 'default'};
  user-select: none;
  transition: all var(--transition-fast);
  
  &:hover {
    background: ${props => props.canSort ? 'var(--color-bg-elevated)' : 'var(--color-bg-tertiary)'};
  }
  
  .sort-icon {
    opacity: 0.5;
    transition: opacity var(--transition-fast);
    
    &.active {
      opacity: 1;
      color: var(--color-primary);
    }
  }
`;

const TableBody = styled.div`
  display: contents;
`;

const Row = styled.div<{ isEven: boolean }>`
  display: contents;
  
  &:hover > div {
    background: var(--color-bg-elevated);
  }
`;

const Cell = styled.div<{ isEven: boolean }>`
  padding: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  background: ${props => props.isEven ? 'var(--color-bg-secondary)' : 'rgba(255, 255, 255, 0.02)'};
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  transition: background var(--transition-fast);
  
  &.status-cell {
    font-weight: 600;
    text-transform: capitalize;
  }
  
  &.revenue-cell {
    font-family: var(--font-mono);
    color: var(--color-success);
    font-weight: 600;
  }
  
  &.date-cell {
    font-family: var(--font-mono);
    color: var(--color-text-muted);
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'active':
        return 'rgba(0, 255, 136, 0.1)';
      case 'inactive':
        return 'rgba(255, 68, 102, 0.1)';
      case 'pending':
        return 'rgba(255, 234, 0, 0.1)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active':
        return 'var(--color-success)';
      case 'inactive':
        return 'var(--color-error)';
      case 'pending':
        return 'var(--color-tertiary)';
      default:
        return 'var(--color-text-secondary)';
    }
  }};
  border: 1px solid currentColor;
`;

export const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
  data,
  onSortChange,
  sortBy,
  sortDirection,
}) => {
  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'revenue',
        header: 'Revenue',
        size: 120,
        cell: (info) => (
          <span className="revenue-cell">
            ${info.getValue<number>().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: (info) => (
          <StatusBadge status={info.getValue<string>()}>
            {info.getValue<string>()}
          </StatusBadge>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
        cell: (info) => (
          <span className="date-cell">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 150,
      },
      {
        accessorKey: 'product',
        header: 'Product',
        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'Qty',
        size: 80,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 120,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();
  
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  const items = virtualizer.getVirtualItems();

  const columnSizes = columns.map(col => col.size || 150);
  const totalWidth = columnSizes.reduce((sum, size) => sum + size, 0);

  return (
    <TableContainer>
      <TableWrapper ref={parentRef}>
        <Table style={{ gridTemplateColumns: columnSizes.map(s => `${s}px`).join(' '), minWidth: `${totalWidth}px` }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <HeaderCell
                  key={header.id}
                  canSort={header.column.getCanSort()}
                  onClick={() => onSortChange?.(header.column.id)}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {sortBy === header.column.id && (
                    sortDirection === 'asc' ? (
                      <FiArrowUp className="sort-icon active" />
                    ) : (
                      <FiArrowDown className="sort-icon active" />
                    )
                  )}
                </HeaderCell>
              ))
            )}
          </TableHeader>

          <TableBody
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {items.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <Row
                  key={row.id}
                  isEven={virtualRow.index % 2 === 0}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Cell key={cell.id} isEven={virtualRow.index % 2 === 0}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Cell>
                  ))}
                </Row>
              );
            })}
          </TableBody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};