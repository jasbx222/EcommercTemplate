'use client'

import { useState } from 'react'
import useSWR from 'swr'
import CardBox from '@/app/components/shared/CardBox'
import { DataTable, type DataTableColumn } from '@/app/components/shared/DataTable'
import { FormDialog } from '@/app/components/shared/FormDialog'
import { ConfirmDialog } from '@/app/components/shared/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Icon } from '@iconify/react'
import { adsApi, productApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Ad } from '@/lib/api/types'

const emptyForm = {
  title: '',
  type: 'slider' as 'slider' | 'banner',
  product_id: '',
  order: '',
  image: undefined as File | undefined,
}

const AdsApp = () => {
  const toast = useToast()
  const { data: ads, error, isLoading, mutate } = useSWR('admin-ads', () => adsApi.list())
  const { data: products } = useSWR('admin-products-ref', () => productApi.list())
  const rows = ads ?? []
  const productOptions = products ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Ad | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Ad | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const openEdit = (ad: Ad) => {
    setEditing(ad)
    setForm({
      title: ad.title,
      type: ad.type,
      product_id: ad.product_id ? String(ad.product_id) : '',
      order: ad.order ? String(ad.order) : '',
      image: undefined,
    })
    setFormError(null)
    setIsFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.type) {
      setFormError('العنوان والنوع حقلان مطلوبان')
      return
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      const payload = {
        title: form.title.trim(),
        type: form.type,
        image: form.image,
        product_id: form.product_id ? Number(form.product_id) : undefined,
        order: form.order ? Number(form.order) : undefined,
      }
      if (editing) {
        await adsApi.update(editing.id, payload)
        toast.success('تم تحديث الإعلان بنجاح')
      } else {
        await adsApi.create(payload)
        toast.success('تم إنشاء الإعلان بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ الإعلان')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await adsApi.remove(deleteTarget.id)
      toast.success('تم حذف الإعلان بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف الإعلان')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<Ad>[] = [
    { key: 'id', header: '#' },
    { key: 'title', header: 'العنوان' },
    {
      key: 'type',
      header: 'النوع',
      render: (row) => (
        <Badge variant={row.type === 'slider' ? 'lightPrimary' : 'lightSecondary'}>
          {row.type === 'slider' ? 'شريط متحرك' : 'بانر'}
        </Badge>
      ),
    },
    { key: 'order', header: 'الترتيب', render: (row) => row.order ?? '—' },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل الإعلانات' : null}
        searchableFields={['title']}
        searchPlaceholder="بحث بعنوان الإعلان..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة إعلان
          </Button>
        }
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" variant="ghostprimary" onClick={() => openEdit(row)}>
              <Icon icon="solar:pen-line-duotone" height={18} />
            </Button>
            <Button size="sm" variant="ghosterror" onClick={() => setDeleteTarget(row)}>
              <Icon icon="solar:trash-bin-trash-line-duotone" height={18} />
            </Button>
          </div>
        )}
      />

      <FormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={editing ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div>
          <Label htmlFor="ad-title" className="mb-2 block">العنوان</Label>
          <Input id="ad-title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ad-type" className="mb-2 block">النوع</Label>
            <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as 'slider' | 'banner' }))}>
              <SelectTrigger id="ad-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slider">شريط متحرك (Slider)</SelectItem>
                <SelectItem value="banner">بانر (Banner)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="ad-order" className="mb-2 block">الترتيب (اختياري)</Label>
            <Input id="ad-order" type="number" min={0} value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))} />
          </div>
        </div>
        <div>
          <Label htmlFor="ad-product" className="mb-2 block">المنتج المرتبط (اختياري)</Label>
          <Select value={form.product_id || undefined} onValueChange={(v) => setForm((f) => ({ ...f, product_id: v }))}>
            <SelectTrigger id="ad-product" className="w-full">
              <SelectValue placeholder="بدون منتج" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="ad-image" className="mb-2 block">
            الصورة {editing && '(اتركها فارغة للإبقاء على الصورة الحالية)'}
          </Label>
          <Input id="ad-image" type="file" accept="image/*" onChange={(e) => setForm((f) => ({ ...f, image: e.target.files?.[0] }))} />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="حذف الإعلان"
        description={`هل أنت متأكد من حذف الإعلان "${deleteTarget?.title}"؟`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default AdsApp
