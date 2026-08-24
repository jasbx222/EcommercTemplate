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
import { Icon } from '@iconify/react'
import { colorApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Color } from '@/lib/api/types'

const emptyForm = { name: '', name_in_hexa: '#000000' }

const ColorsApp = () => {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-colors', () => colorApi.list())
  const colors = data ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Color | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [deleteTarget, setDeleteTarget] = useState<Color | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const openEdit = (color: Color) => {
    setEditing(color)
    setForm({ name: color.name, name_in_hexa: color.name_in_hexa })
    setFormError(null)
    setIsFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setFormError('اسم اللون مطلوب')
      return
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      if (editing) {
        await colorApi.update(editing.id, form)
        toast.success('تم تحديث اللون بنجاح')
      } else {
        await colorApi.create(form)
        toast.success('تم إنشاء اللون بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ اللون')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await colorApi.remove(deleteTarget.id)
      toast.success('تم حذف اللون بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف اللون')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<Color>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'الاسم' },
    {
      key: 'name_in_hexa',
      header: 'اللون',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full border border-ld"
            style={{ backgroundColor: row.name_in_hexa }}
          />
          <span className="uppercase">{row.name_in_hexa}</span>
        </div>
      ),
    },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={colors}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل الألوان' : null}
        searchableFields={['name']}
        searchPlaceholder="بحث باسم اللون..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة لون
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
        title={editing ? 'تعديل اللون' : 'إضافة لون جديد'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div>
          <Label htmlFor="color-name" className="mb-2 block">
            الاسم
          </Label>
          <Input
            id="color-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="color-hex" className="mb-2 block">
            كود اللون
          </Label>
          <div className="flex items-center gap-3">
            <Input
              id="color-hex"
              type="color"
              className="h-10 w-16 p-1"
              value={/^#[0-9a-fA-F]{6}$/.test(form.name_in_hexa) ? form.name_in_hexa : '#000000'}
              onChange={(e) => setForm((f) => ({ ...f, name_in_hexa: e.target.value }))}
            />
            <Input
              value={form.name_in_hexa}
              onChange={(e) => setForm((f) => ({ ...f, name_in_hexa: e.target.value }))}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="حذف اللون"
        description={`هل أنت متأكد من حذف اللون "${deleteTarget?.name}"؟`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default ColorsApp
