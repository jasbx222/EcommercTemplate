'use client'

import { useMemo, useState } from 'react'
import useSWR from 'swr'
import CardBox from '@/app/components/shared/CardBox'
import { DataTable, type DataTableColumn } from '@/app/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Icon } from '@iconify/react'
import { courierApi, orderApi, packageSizeApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Order, OrderStatus } from '@/lib/api/types'

const STATUS_LABELS: Record<OrderStatus, string> = {
  preparing: 'قيد التحضير',
  ready_to_ship: 'جاهز للشحن',
  shipped: 'تم الشحن',
  partially_returned: 'إرجاع جزئي',
  returned: 'مرتجع',
  completed: 'مكتمل',
  cancelled: 'ملغي',
}

const STATUS_BADGE: Record<OrderStatus, React.ComponentProps<typeof Badge>['variant']> = {
  preparing: 'lightInfo',
  ready_to_ship: 'lightWarning',
  shipped: 'lightPrimary',
  partially_returned: 'lightWarning',
  returned: 'lightError',
  completed: 'lightSuccess',
  cancelled: 'lightError',
}

const STATUS_OPTIONS = Object.keys(STATUS_LABELS) as OrderStatus[]

const OrdersApp = () => {
  const toast = useToast()
  const { data: orders, error, isLoading, mutate } = useSWR('admin-orders', () => orderApi.list())
  const { data: couriers } = useSWR('admin-couriers-ref', () => courierApi.list())
  const { data: packageSizes } = useSWR('admin-package-sizes-ref', () => packageSizeApi.list())

  const rows = orders ?? []
  const courierOptions = couriers ?? []
  const packageSizeOptions = packageSizes ?? []

  const [statusFilter, setStatusFilter] = useState<string>('all')
  const filteredRows = useMemo(
    () => (statusFilter === 'all' ? rows : rows.filter((o) => o.status === statusFilter)),
    [rows, statusFilter]
  )

  const [statusDialogOrder, setStatusDialogOrder] = useState<Order | null>(null)
  const [statusValue, setStatusValue] = useState<OrderStatus>('preparing')
  const [packageSizeValue, setPackageSizeValue] = useState('')
  const [isSavingStatus, setIsSavingStatus] = useState(false)

  const [courierDialogOrder, setCourierDialogOrder] = useState<Order | null>(null)
  const [courierValue, setCourierValue] = useState('')
  const [isSavingCourier, setIsSavingCourier] = useState(false)

  const [deliveryDialogOrder, setDeliveryDialogOrder] = useState<Order | null>(null)
  const [deliveryValue, setDeliveryValue] = useState<'alwaseet' | 'alnaaqil'>('alwaseet')
  const [isSavingDelivery, setIsSavingDelivery] = useState(false)

  const openStatusDialog = (order: Order) => {
    setStatusDialogOrder(order)
    setStatusValue(order.status)
    setPackageSizeValue(order.package_size_id ? String(order.package_size_id) : '')
  }

  const submitStatus = async () => {
    if (!statusDialogOrder) return
    setIsSavingStatus(true)
    try {
      await orderApi.updateStatus(
        statusDialogOrder.id,
        statusValue,
        packageSizeValue ? Number(packageSizeValue) : undefined
      )
      toast.success('تم تحديث حالة الطلب بنجاح')
      setStatusDialogOrder(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر تحديث حالة الطلب')
    } finally {
      setIsSavingStatus(false)
    }
  }

  const submitCourier = async () => {
    if (!courierDialogOrder || !courierValue) return
    setIsSavingCourier(true)
    try {
      await orderApi.assignCourier(courierDialogOrder.id, Number(courierValue))
      toast.success('تم تعيين المندوب بنجاح')
      setCourierDialogOrder(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر تعيين المندوب')
    } finally {
      setIsSavingCourier(false)
    }
  }

  const submitDelivery = async () => {
    if (!deliveryDialogOrder) return
    setIsSavingDelivery(true)
    try {
      await orderApi.changeDeliveryCompany(deliveryDialogOrder.id, deliveryValue)
      toast.success('تم تغيير شركة التوصيل بنجاح')
      setDeliveryDialogOrder(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر تغيير شركة التوصيل')
    } finally {
      setIsSavingDelivery(false)
    }
  }

  const columns: DataTableColumn<Order>[] = [
    { key: 'id', header: '#' },
    {
      key: 'client',
      header: 'العميل',
      render: (row) => row.client?.name ?? (row.client_id ? `#${row.client_id}` : '—'),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (row) => <Badge variant={STATUS_BADGE[row.status]}>{STATUS_LABELS[row.status]}</Badge>,
    },
    {
      key: 'delivery_company',
      header: 'شركة التوصيل',
      render: (row) => (row.delivery_company === 'alwaseet' ? 'الوسيط' : row.delivery_company === 'alnaaqil' ? 'الناقل' : '—'),
    },
    { key: 'total', header: 'الإجمالي', render: (row) => row.total ?? '—' },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={filteredRows}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل الطلبات' : null}
        toolbar={
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="كل الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الحالات</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
        actions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                إجراءات
                <Icon icon="solar:alt-arrow-down-line-duotone" height={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => openStatusDialog(row)}>
                <Icon icon="solar:refresh-circle-line-duotone" height={18} className="me-2" />
                تحديث الحالة
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setCourierDialogOrder(row)
                  setCourierValue(row.courier_id ? String(row.courier_id) : '')
                }}
              >
                <Icon icon="solar:scooter-line-duotone" height={18} className="me-2" />
                تعيين مندوب
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setDeliveryDialogOrder(row)
                  setDeliveryValue(row.delivery_company ?? 'alwaseet')
                }}
              >
                <Icon icon="solar:delivery-line-duotone" height={18} className="me-2" />
                تغيير شركة التوصيل
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />

      {/* Update status dialog */}
      <Dialog open={Boolean(statusDialogOrder)} onOpenChange={(open) => !open && setStatusDialogOrder(null)}>
        <DialogContent className="w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب #{statusDialogOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label className="mb-2 block">الحالة</Label>
              <Select value={statusValue} onValueChange={(v) => setStatusValue(v as OrderStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">حجم الطرد (اختياري)</Label>
              <Select value={packageSizeValue || undefined} onValueChange={setPackageSizeValue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="بدون تحديد" />
                </SelectTrigger>
                <SelectContent>
                  {packageSizeOptions.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOrder(null)} disabled={isSavingStatus}>إلغاء</Button>
            <Button onClick={submitStatus} disabled={isSavingStatus}>{isSavingStatus ? 'جارٍ الحفظ...' : 'حفظ'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign courier dialog */}
      <Dialog open={Boolean(courierDialogOrder)} onOpenChange={(open) => !open && setCourierDialogOrder(null)}>
        <DialogContent className="w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>تعيين مندوب للطلب #{courierDialogOrder?.id}</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="mb-2 block">المندوب</Label>
            <Select value={courierValue || undefined} onValueChange={setCourierValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر المندوب" />
              </SelectTrigger>
              <SelectContent>
                {courierOptions.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourierDialogOrder(null)} disabled={isSavingCourier}>إلغاء</Button>
            <Button onClick={submitCourier} disabled={isSavingCourier || !courierValue}>{isSavingCourier ? 'جارٍ الحفظ...' : 'حفظ'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change delivery company dialog */}
      <Dialog open={Boolean(deliveryDialogOrder)} onOpenChange={(open) => !open && setDeliveryDialogOrder(null)}>
        <DialogContent className="w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>تغيير شركة التوصيل للطلب #{deliveryDialogOrder?.id}</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="mb-2 block">شركة التوصيل</Label>
            <Select value={deliveryValue} onValueChange={(v) => setDeliveryValue(v as 'alwaseet' | 'alnaaqil')}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alwaseet">الوسيط</SelectItem>
                <SelectItem value="alnaaqil">الناقل</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeliveryDialogOrder(null)} disabled={isSavingDelivery}>إلغاء</Button>
            <Button onClick={submitDelivery} disabled={isSavingDelivery}>{isSavingDelivery ? 'جارٍ الحفظ...' : 'حفظ'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardBox>
  )
}

export default OrdersApp
