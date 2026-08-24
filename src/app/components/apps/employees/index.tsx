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
import { employeeApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Employee } from '@/lib/api/types'

const emptyForm = { name: '', email: '', password: '' }

const EmployeesApp = () => {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-employees', () => employeeApi.list())
  const employees = data ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const openEdit = (employee: Employee) => {
    setEditing(employee)
    setForm({ name: employee.name, email: employee.email, password: '' })
    setFormError(null)
    setIsFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || (!editing && !form.password)) {
      setFormError('الاسم والبريد الإلكتروني مطلوبان، وكلمة المرور مطلوبة عند الإنشاء')
      return
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      if (editing) {
        await employeeApi.update(editing.id, {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password || undefined,
        })
        toast.success('تم تحديث بيانات الموظف بنجاح')
      } else {
        await employeeApi.create({ name: form.name.trim(), email: form.email.trim(), password: form.password })
        toast.success('تم إنشاء الموظف بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ بيانات الموظف')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await employeeApi.remove(deleteTarget.id)
      toast.success('تم حذف الموظف بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف الموظف')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<Employee>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'الاسم' },
    { key: 'email', header: 'البريد الإلكتروني' },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={employees}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل الموظفين' : null}
        searchableFields={['name', 'email']}
        searchPlaceholder="بحث بالاسم أو البريد الإلكتروني..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة موظف
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
        title={editing ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div>
          <Label htmlFor="emp-name" className="mb-2 block">الاسم</Label>
          <Input id="emp-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        </div>
        <div>
          <Label htmlFor="emp-email" className="mb-2 block">البريد الإلكتروني</Label>
          <Input id="emp-email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
        </div>
        <div>
          <Label htmlFor="emp-password" className="mb-2 block">
            كلمة المرور {editing && '(اتركها فارغة لعدم التغيير)'}
          </Label>
          <Input
            id="emp-password"
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
        title="حذف الموظف"
        description={`هل أنت متأكد من حذف الموظف "${deleteTarget?.name}"؟`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default EmployeesApp
