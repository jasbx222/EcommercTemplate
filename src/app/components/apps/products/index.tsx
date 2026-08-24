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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Icon } from '@iconify/react'
import { categoryApi, colorApi, productApi, type ProductFields } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Product } from '@/lib/api/types'

const emptyForm = {
  name: '',
  quantity: '',
  price: '',
  category_id: '',
  min_size: '',
  max_size: '',
  count_in_carton: '',
  description: '',
  colors: [] as number[],
  images: [] as File[],
}

const formatPrice = (val: string | number | undefined | null) => {
  if (val === undefined || val === null || val === '') return '—'
  const num = Number(val)
  if (isNaN(num)) return String(val)
  return num.toLocaleString('en-US')
}

const ProductsApp = () => {
  const toast = useToast()
  const { data: products, error, isLoading, mutate } = useSWR('admin-products', () => productApi.list())
  const { data: categories } = useSWR('admin-categories-ref', () => categoryApi.list())
  const { data: colors } = useSWR('admin-colors-ref', () => colorApi.list())

  const rows = products ?? []
  const categoryOptions = categories ?? []
  const colorOptions = colors ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const [loadingEditId, setLoadingEditId] = useState<number | null>(null)

  const openEdit = async (product: Product) => {
    setLoadingEditId(product.id)
    try {
      const res = await productApi.show(product.id)
      // Some endpoints return the object directly without a { data: ... } wrapper
      const fullProduct = (res.data ?? res) as Product
      setEditing(fullProduct)
      
      const resolvedCategoryId = fullProduct.category_id ?? fullProduct.category?.id
      
      setForm({
        name: fullProduct.name ?? '',
        quantity: fullProduct.quantity !== undefined && fullProduct.quantity !== null ? String(fullProduct.quantity) : '',
        price: fullProduct.price !== undefined && fullProduct.price !== null && !isNaN(Number(fullProduct.price)) ? String(Number(fullProduct.price)) : String(fullProduct.price ?? ''),
        category_id: resolvedCategoryId ? String(resolvedCategoryId) : '',
        min_size: fullProduct.min_size !== undefined && fullProduct.min_size !== null && !isNaN(Number(fullProduct.min_size)) && fullProduct.min_size !== '' ? String(Number(fullProduct.min_size)) : (fullProduct.min_size ?? ''),
        max_size: fullProduct.max_size !== undefined && fullProduct.max_size !== null && !isNaN(Number(fullProduct.max_size)) && fullProduct.max_size !== '' ? String(Number(fullProduct.max_size)) : (fullProduct.max_size ?? ''),
        count_in_carton: fullProduct.count_in_carton ? String(fullProduct.count_in_carton) : '',
        description: fullProduct.description ?? '',
        colors: (fullProduct.colors ?? []).map((c) => c.id),
        images: [],
      })
      setFormError(null)
      setIsFormOpen(true)
    } catch (err) {
      toast.error('تعذر جلب بيانات المنتج')
    } finally {
      setLoadingEditId(null)
    }
  }

  const toggleColor = (id: number) => {
    setForm((f) => ({
      ...f,
      colors: f.colors.includes(id) ? f.colors.filter((c) => c !== id) : [...f.colors, id],
    }))
  }

  const handleSubmit = async () => {
    if (!editing) {
      if (!form.name.trim() || !form.price || !form.category_id) {
        setFormError('الاسم والسعر والفئة حقول مطلوبة لإضافة منتج جديد')
        return
      }
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      const payload = {
        name: form.name.trim() || (editing?.name ?? ''),
        quantity: form.quantity !== '' ? Number(form.quantity) : (editing?.quantity ?? 0),
        price: form.price !== '' ? Number(form.price) : (editing?.price ? Number(editing.price) : 0),
        category_id: form.category_id ? Number(form.category_id) : (editing?.category_id ?? editing?.category?.id ?? undefined),
        min_size: form.min_size || '',
        max_size: form.max_size || '',
        count_in_carton: form.count_in_carton ? Number(form.count_in_carton) : undefined,
        description: form.description || '',
        colors: form.colors.length ? form.colors : [],
        images: form.images.length ? form.images : undefined,
      }
      if (editing) {
        await productApi.update(editing.id, payload)
        toast.success('تم تحديث المنتج بنجاح')
      } else {
        await productApi.create(payload as ProductFields)
        toast.success('تم إنشاء المنتج بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ المنتج')
    } finally {
      setIsSubmitting(false)
    }
  }

  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await productApi.remove(deleteTarget.id)
      toast.success('تم حذف المنتج بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر تنفيذ العملية')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<Product>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'الاسم' },
    {
      key: 'category_id',
      header: 'الفئة',
      render: (row) => categoryOptions.find((c) => c.id === (row.category_id ?? row.category?.id))?.name ?? row.category?.name ?? '—',
    },
    {
      key: 'price',
      header: 'السعر',
      render: (row) => formatPrice(row.price),
    },
    {
      key: 'quantity',
      header: 'الكمية',
      render: (row) => (
        <span className={row.quantity > 0 ? '' : 'text-error font-medium'}>{row.quantity}</span>
      ),
    },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل المنتجات' : null}
        searchableFields={['name']}
        searchPlaceholder="بحث باسم المنتج..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة منتج
          </Button>
        }
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" variant="ghostprimary" onClick={() => openEdit(row)} disabled={loadingEditId === row.id}>
              {loadingEditId === row.id ? (
                <Icon icon="solar:spinner-bold-duotone" height={18} className="animate-spin" />
              ) : (
                <Icon icon="solar:pen-line-duotone" height={18} />
              )}
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
        title={editing ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="p-name" className="mb-2 block">الاسم</Label>
            <Input id="p-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required={!editing} />
          </div>
          <div>
            <Label htmlFor="p-category" className="mb-2 block">الفئة</Label>
            <Select value={form.category_id || undefined} onValueChange={(v) => setForm((f) => ({ ...f, category_id: v }))}>
              <SelectTrigger id="p-category" className="w-full">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="p-quantity" className="mb-2 block">الكمية</Label>
            <Input id="p-quantity" type="number" min={0} value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="p-price" className="mb-2 block">السعر</Label>
            <Input id="p-price" type="number" min={0} step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required={!editing} />
          </div>
          <div>
            <Label htmlFor="p-min" className="mb-2 block">أقل حجم</Label>
            <Input id="p-min" value={form.min_size} onChange={(e) => setForm((f) => ({ ...f, min_size: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="p-max" className="mb-2 block">أكبر حجم</Label>
            <Input id="p-max" value={form.max_size} onChange={(e) => setForm((f) => ({ ...f, max_size: e.target.value }))} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="p-carton" className="mb-2 block">العدد في الكرتون</Label>
            <Input id="p-carton" type="number" min={0} value={form.count_in_carton} onChange={(e) => setForm((f) => ({ ...f, count_in_carton: e.target.value }))} />
          </div>
        </div>

        <div>
          <Label htmlFor="p-desc" className="mb-2 block">الوصف</Label>
          <Textarea id="p-desc" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
        </div>

        <div>
          <Label className="mb-2 block">الألوان المتوفرة</Label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <label key={color.id} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={form.colors.includes(color.id)} onCheckedChange={() => toggleColor(color.id)} />
                <span className="h-4 w-4 rounded-full border border-ld" style={{ backgroundColor: color.name_in_hexa }} />
                {color.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="p-images" className="mb-2 block">
            الصور {editing && '(اختياري: رفع صور إضافية)'}
          </Label>
          {editing && editing.images && editing.images.length > 0 && (
            <div className="mb-3">
              <span className="text-xs text-muted-foreground block mb-1">الصور الحالية للمنتج:</span>
              <div className="flex flex-wrap gap-2">
                {editing.images.map((img, idx) => {
                  const src = img.url || (img as any).path || (img as any).image
                  return src ? (
                    <div key={img.id || idx} className="relative w-14 h-14 rounded-md overflow-hidden border border-border bg-muted">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}
          <Input
            id="p-images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setForm((f) => ({ ...f, images: e.target.files ? Array.from(e.target.files) : [] }))}
          />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="حذف المنتج"
        description={`هل أنت متأكد من حذف المنتج "${deleteTarget?.name}"؟ لا يمكن التراجع عن هذه العملية.`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default ProductsApp
