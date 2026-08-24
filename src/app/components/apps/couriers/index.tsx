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
import { courierApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Courier } from '@/lib/api/types'

const emptyForm = { name: '', phone: '', password: '' }

const CouriersApp = () => {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-couriers', () => courierApi.list())
  const couriers = data ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Courier | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Courier | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const openEdit = (courier: Courier) => {
    setEditing(courier)
    setForm({ name: courier.name, phone: courier.phone, password: '' })
    setFormError(null)
    setIsFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || (!editing && !form.password)) {
      setFormError('الاسم والهاتف مطلوبان، وكلمة المرور مطلوبة عند الإنشاء')
      return
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      if (editing) {
        await courierApi.update(editing.id, {
          name: form.name.trim(),
          phone: form.phone.trim(),
          password: form.password || undefined,
        })
        toast.success('تم تحديث بيانات المندوب بنجاح')
      } else {
        await courierApi.create({ name: form.name.trim(), phone: form.phone.trim(), password: form.password })
        toast.success('تم إنشاء المندوب بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ بيانات المندوب')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await courierApi.remove(deleteTarget.id)
      toast.success('تم حذف المندوب بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف المندوب')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<Courier>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'الاسم' },
    { key: 'phone', header: 'الهاتف' },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={couriers}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل المندوبين' : null}
        searchableFields={['name', 'phone']}
        searchPlaceholder="بحث بالاسم أو الهاتف..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة مندوب
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
        title={editing ? 'تعديل بيانات المندوب' : 'إضافة مندوب جديد'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div>
          <Label htmlFor="cr-name" className="mb-2 block">الاسم</Label>
          <Input id="cr-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        </div>
        <div>
          <Label htmlFor="cr-phone" className="mb-2 block">الهاتف</Label>
          <Input id="cr-phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+9647xxxxxxxxx" required />
        </div>
        <div>
          <Label htmlFor="cr-password" className="mb-2 block">
            كلمة المرور {editing && '(اتركها فارغة لعدم التغيير)'}
          </Label>
          <Input
            id="cr-password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            autoComplete="new-password"
            required={!editing}
          />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="حذف المندوب"
        description={`هل أنت متأكد من حذف المندوب "${deleteTarget?.name}"؟`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default CouriersApp
