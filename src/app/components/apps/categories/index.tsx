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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Icon } from '@iconify/react'
import { categoryApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Category } from '@/lib/api/types'

const emptyForm = { name: '', parent_id: '', image: undefined as File | undefined }

const CategoriesApp = () => {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-categories', () => categoryApi.list())
  const categories = data ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const openEdit = (category: Category) => {
    setEditing(category)
    setForm({ name: category.name, parent_id: category.parent_id ? String(category.parent_id) : '', image: undefined })
    setFormError(null)
    setIsFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setFormError('اسم الفئة مطلوب')
      return
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      const payload = {
        name: form.name.trim(),
        image: form.image,
        parent_id: form.parent_id ? Number(form.parent_id) : undefined,
      }
      if (editing) {
        await categoryApi.update(editing.id, payload)
        toast.success('تم تحديث الفئة بنجاح')
      } else {
        await categoryApi.create(payload)
        toast.success('تم إنشاء الفئة بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ الفئة')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await categoryApi.remove(deleteTarget.id)
      toast.success('تم حذف الفئة بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف الفئة')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<Category>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'الاسم' },
    {
      key: 'parent_id',
      header: 'الفئة الأب',
      render: (row) => categories.find((c) => c.id === row.parent_id)?.name ?? '—',
    },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={categories}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل الفئات' : null}
        searchableFields={['name']}
        searchPlaceholder="بحث باسم الفئة..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة فئة
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
        title={editing ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div>
          <Label htmlFor="cat-name" className="mb-2 block">
            الاسم
          </Label>
          <Input
            id="cat-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="cat-parent" className="mb-2 block">
            الفئة الأب (اختياري)
          </Label>
          <Select
            value={form.parent_id || undefined}
            onValueChange={(value) => setForm((f) => ({ ...f, parent_id: value }))}
          >
            <SelectTrigger id="cat-parent" className="w-full">
              <SelectValue placeholder="بدون فئة أب" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((c) => c.id !== editing?.id)
                .map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="cat-image" className="mb-2 block">
            الصورة {editing && '(اتركها فارغة للإبقاء على الصورة الحالية)'}
          </Label>
          <Input
            id="cat-image"
            type="file"
            accept="image/*"
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.files?.[0] }))}
          />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="حذف الفئة"
        description={`هل أنت متأكد من حذف الفئة "${deleteTarget?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default CategoriesApp
