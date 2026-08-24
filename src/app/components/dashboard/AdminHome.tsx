'use client'

import useSWR from 'swr'
import Link from 'next/link'
import CardBox from '@/app/components/shared/CardBox'
import { Icon } from '@iconify/react'
import { homeApi, orderApi, reportApi } from '@/lib/api/resources'

function StatCard({
  icon,
  label,
  value,
  href,
  isLoading,
}: {
  icon: string
  label: string
  value: number | string
  href: string
  isLoading?: boolean
}) {
  return (
    <Link href={href}>
      <CardBox className="bg-background hover:shadow-md transition-shadow h-full">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-lightprimary flex items-center justify-center text-primary shrink-0">
            <Icon icon={icon} height={24} />
          </div>
          <div>
            <p className="text-sm text-link dark:text-darklink">{label}</p>
            <p className="text-2xl font-semibold">{isLoading ? '—' : value}</p>
          </div>
        </div>
      </CardBox>
    </Link>
  )
}

const AdminHome = () => {
  const { data: home, isLoading: homeLoading } = useSWR('admin-home', () => homeApi.get())
  const { data: orders, isLoading: ordersLoading } = useSWR('admin-orders', () => orderApi.list())
  const { data: topSelling, isLoading: topSellingLoading } = useSWR('report-top-selling', () => reportApi.topSellingProducts())

  const counts = home?.data?.counts
  const topClients = home?.data?.top_clients ?? []

  return (
    <div className="flex flex-col gap-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-30">
        <StatCard icon="solar:box-line-duotone" label="المنتجات" value={counts?.products ?? 0} href="/apps/products" isLoading={homeLoading} />
        <StatCard icon="solar:cart-large-line-duotone" label="الطلبات" value={counts?.orders ?? 0} href="/apps/orders" isLoading={homeLoading} />
        <StatCard icon="solar:users-group-rounded-line-duotone" label="العملاء" value={counts?.clients ?? 0} href="/apps/clients" isLoading={homeLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">
        <CardBox className="bg-background">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">الأكثر مبيعًا</h5>
            <Link href="/apps/reports" className="text-sm text-primary hover:underline">عرض الكل</Link>
          </div>
          {topSellingLoading ? (
            <p className="text-sm text-link dark:text-darklink">جارٍ التحميل...</p>
          ) : !topSelling?.length ? (
            <p className="text-sm text-link dark:text-darklink">لا توجد بيانات</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topSelling.slice(0, 5).map((item) => (
                <div key={item.product_id} className="flex items-center justify-between text-sm">
                  <span>{item.product?.name ?? `#${item.product_id}`}</span>
                  <span className="text-link dark:text-darklink">{item.total_sold} مباع</span>
                </div>
              ))}
            </div>
          )}
        </CardBox>

        <CardBox className="bg-background">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">أفضل العملاء</h5>
            <Link href="/apps/clients" className="text-sm text-primary hover:underline">عرض الكل</Link>
          </div>
          {homeLoading ? (
            <p className="text-sm text-link dark:text-darklink">جارٍ التحميل...</p>
          ) : !topClients.length ? (
            <p className="text-sm text-link dark:text-darklink">لا توجد بيانات بعد</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topClients.slice(0, 5).map((client) => (
                <div key={client.id} className="flex items-center justify-between text-sm">
                  <span>{client.name ?? `#${client.id}`}</span>
                  <span className="text-link dark:text-darklink">{client.phone ?? '—'}</span>
                </div>
              ))}
            </div>
          )}
        </CardBox>
      </div>

      <CardBox className="bg-background">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold">آخر الطلبات</h5>
          <Link href="/apps/orders" className="text-sm text-primary hover:underline">عرض الكل</Link>
        </div>
        {ordersLoading ? (
          <p className="text-sm text-link dark:text-darklink">جارٍ التحميل...</p>
        ) : !orders?.length ? (
          <p className="text-sm text-link dark:text-darklink">لا توجد طلبات</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between text-sm">
                <span>طلب #{order.id}</span>
                <span className="text-link dark:text-darklink">{order.client?.name ?? '—'}</span>
              </div>
            ))}
          </div>
        )}
      </CardBox>
    </div>
  )
}

export default AdminHome
