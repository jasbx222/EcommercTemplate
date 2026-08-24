'use client'

import { useState } from 'react'
import useSWR from 'swr'
import CardBox from '@/app/components/shared/CardBox'
import { DataTable, type DataTableColumn } from '@/app/components/shared/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cityApi, orderApi, reportApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import type { CityOrderReport, Product, TopCustomer, TopSellingProduct } from '@/lib/api/types'

const ReportsApp = () => {
  const { data: topSelling, error: topSellingError, isLoading: topSellingLoading } = useSWR(
    'report-top-selling',
    () => reportApi.topSellingProducts()
  )
  const { data: outOfStock, error: outOfStockError, isLoading: outOfStockLoading } = useSWR(
    'report-out-of-stock',
    () => reportApi.outOfStockProducts()
  )
  const { data: topCustomers, error: topCustomersError, isLoading: topCustomersLoading } = useSWR(
    'report-top-customers',
    () => reportApi.topCustomers()
  )
  const { data: cities } = useSWR('admin-cities-ref', () => cityApi.list())

  const [selectedCity, setSelectedCity] = useState('')
  const [cityReport, setCityReport] = useState<CityOrderReport | null>(null)
  const [isLoadingCityReport, setIsLoadingCityReport] = useState(false)
  const [cityReportError, setCityReportError] = useState<string | null>(null)

  const fetchCityReport = async () => {
    if (!selectedCity) return
    setIsLoadingCityReport(true)
    setCityReportError(null)
    setCityReport(null)
    try {
      const res = await orderApi.cityOrderReport(Number(selectedCity))
      setCityReport(res.data)
    } catch (err) {
      setCityReportError(err instanceof ApiError ? err.message : 'تعذر تحميل تقرير المدينة')
    } finally {
      setIsLoadingCityReport(false)
    }
  }

  const topSellingColumns: DataTableColumn<TopSellingProduct>[] = [
    { key: 'product_id', header: '#' },
    { key: 'product', header: 'المنتج', render: (row) => row.product?.name ?? '—' },
    { key: 'total_sold', header: 'الكمية المباعة' },
    { key: 'price', header: 'السعر', render: (row) => row.product?.price !== undefined && row.product?.price !== null && !isNaN(Number(row.product.price)) ? Number(row.product.price).toLocaleString('en-US') : (row.product?.price ?? '—') },
  ]

  const outOfStockColumns: DataTableColumn<Product>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'اسم المنتج' },
    { key: 'quantity', header: 'الكمية المتبقية' },
  ]

  const topCustomersColumns: DataTableColumn<TopCustomer>[] = [
    { key: 'client_id', header: '#' },
    { key: 'client', header: 'العميل', render: (row) => row.client?.name ?? `#${row.client_id}` },
    { key: 'total_orders', header: 'عدد الطلبات', render: (row) => row.total_orders ?? '—' },
    { key: 'total_spent', header: 'إجمالي الإنفاق', render: (row) => row.total_spent !== undefined && row.total_spent !== null && !isNaN(Number(row.total_spent)) ? Number(row.total_spent).toLocaleString('en-US') : (row.total_spent ?? '—') },
  ]

  return (
    <CardBox className="bg-background">
      <Tabs defaultValue="top-selling">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="top-selling">الأكثر مبيعًا</TabsTrigger>
          <TabsTrigger value="out-of-stock">نفدت الكمية</TabsTrigger>
          <TabsTrigger value="top-customers">أفضل العملاء</TabsTrigger>
          <TabsTrigger value="city-report">تقرير حسب المدينة</TabsTrigger>
        </TabsList>

        <TabsContent value="top-selling" className="mt-4">
          <DataTable
            columns={topSellingColumns}
            rows={topSelling ?? []}
            rowKey={(row) => row.product_id}
            isLoading={topSellingLoading}
            error={topSellingError instanceof ApiError ? topSellingError.message : topSellingError ? 'تعذر تحميل التقرير' : null}
          />
        </TabsContent>

        <TabsContent value="out-of-stock" className="mt-4">
          <DataTable
            columns={outOfStockColumns}
            rows={outOfStock ?? []}
            rowKey={(row) => row.id}
            isLoading={outOfStockLoading}
            error={outOfStockError instanceof ApiError ? outOfStockError.message : outOfStockError ? 'تعذر تحميل التقرير' : null}
            emptyMessage="لا توجد منتجات نفدت كميتها"
          />
        </TabsContent>

        <TabsContent value="top-customers" className="mt-4">
          <DataTable
            columns={topCustomersColumns}
            rows={topCustomers ?? []}
            rowKey={(row) => row.client_id}
            isLoading={topCustomersLoading}
            error={topCustomersError instanceof ApiError ? topCustomersError.message : topCustomersError ? 'تعذر تحميل التقرير' : null}
          />
        </TabsContent>

        <TabsContent value="city-report" className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {(cities ?? []).map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={fetchCityReport} disabled={!selectedCity || isLoadingCityReport}>
              {isLoadingCityReport ? 'جارٍ التحميل...' : 'عرض التقرير'}
            </Button>
          </div>

          {cityReportError && <p className="text-error text-sm">{cityReportError}</p>}

          {cityReport && (
            <div className="rounded-md border border-ld divide-y divide-ld">
              {Object.entries(cityReport).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between px-4 py-2 text-sm">
                  <span className="text-link dark:text-darklink">{key}</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CardBox>
  )
}

export default ReportsApp
