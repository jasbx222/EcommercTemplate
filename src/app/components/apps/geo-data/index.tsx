'use client'

import useSWR from 'swr'
import CardBox from '@/app/components/shared/CardBox'
import { DataTable, type DataTableColumn } from '@/app/components/shared/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cityApi, packageSizeApi, regionApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import type { City, PackageSize, Region } from '@/lib/api/types'

const GeoDataApp = () => {
  const { data: cities, error: citiesError, isLoading: citiesLoading } = useSWR('admin-cities', () => cityApi.list())
  const { data: regions, error: regionsError, isLoading: regionsLoading } = useSWR('admin-regions', () => regionApi.list())
  const { data: packageSizes, error: packageSizesError, isLoading: packageSizesLoading } = useSWR(
    'admin-package-sizes',
    () => packageSizeApi.list()
  )

  const cityRows = cities ?? []
  const cityColumns: DataTableColumn<City>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'اسم المدينة' },
  ]

  const regionColumns: DataTableColumn<Region>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'اسم المنطقة' },
    {
      key: 'city_id',
      header: 'المدينة',
      render: (row) => cityRows.find((c) => c.id === row.city_id)?.name ?? `#${row.city_id}`,
    },
  ]

  const packageSizeColumns: DataTableColumn<PackageSize>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'اسم الحجم' },
  ]

  return (
    <CardBox className="bg-background">
      <Tabs defaultValue="cities">
        <TabsList>
          <TabsTrigger value="cities">المدن</TabsTrigger>
          <TabsTrigger value="regions">المناطق</TabsTrigger>
          <TabsTrigger value="package-sizes">أحجام الطرود</TabsTrigger>
        </TabsList>

        <TabsContent value="cities" className="mt-4">
          <DataTable
            columns={cityColumns}
            rows={cityRows}
            rowKey={(row) => row.id}
            isLoading={citiesLoading}
            error={citiesError instanceof ApiError ? citiesError.message : citiesError ? 'تعذر تحميل المدن' : null}
            searchableFields={['name']}
            searchPlaceholder="بحث باسم المدينة..."
          />
        </TabsContent>

        <TabsContent value="regions" className="mt-4">
          <DataTable
            columns={regionColumns}
            rows={regions ?? []}
            rowKey={(row) => row.id}
            isLoading={regionsLoading}
            error={regionsError instanceof ApiError ? regionsError.message : regionsError ? 'تعذر تحميل المناطق' : null}
            searchableFields={['name']}
            searchPlaceholder="بحث باسم المنطقة..."
          />
        </TabsContent>

        <TabsContent value="package-sizes" className="mt-4">
          <DataTable
            columns={packageSizeColumns}
            rows={packageSizes ?? []}
            rowKey={(row) => row.id}
            isLoading={packageSizesLoading}
            error={
              packageSizesError instanceof ApiError
                ? packageSizesError.message
                : packageSizesError
                ? 'تعذر تحميل أحجام الطرود'
                : null
            }
            searchableFields={['name']}
            searchPlaceholder="بحث باسم الحجم..."
          />
        </TabsContent>
      </Tabs>
    </CardBox>
  )
}

export default GeoDataApp
