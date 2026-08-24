'use client'

import { useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string | number
  isLoading?: boolean
  error?: string | null
  searchPlaceholder?: string
  searchableFields?: (keyof T)[]
  actions?: (row: T) => React.ReactNode
  emptyMessage?: string
  toolbar?: React.ReactNode
}

export function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  isLoading,
  error,
  searchPlaceholder = 'بحث...',
  searchableFields,
  actions,
  emptyMessage = 'لا توجد بيانات لعرضها',
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')

  const filteredRows = useMemo(() => {
    if (!search.trim() || !searchableFields?.length) return rows
    const term = search.trim().toLowerCase()
    return rows.filter((row) =>
      searchableFields.some((field) => String(row[field] ?? '').toLowerCase().includes(term))
    )
  }, [rows, search, searchableFields])

  const columnCount = columns.length + (actions ? 1 : 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {searchableFields?.length ? (
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        ) : (
          <div />
        )}
        {toolbar}
      </div>

      {error && <p className="text-error text-sm">{error}</p>}

      <div className="overflow-x-auto rounded-md border border-ld">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
              {actions && <TableHead className="text-end">إجراءات</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : filteredRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="text-center text-link dark:text-darklink py-8"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.map((row) => (
                <TableRow key={rowKey(row)}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '-')}
                    </TableCell>
                  ))}
                  {actions && <TableCell className="text-end">{actions(row)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
