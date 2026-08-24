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
import { socialMediaApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { SocialMediaLink } from '@/lib/api/types'

const emptyForm = { platform: '', link: '', icon: undefined as File | undefined }

const SocialMediaApp = () => {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-social-media', () => socialMediaApi.list())
  const links = data ?? []

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<SocialMediaLink | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<SocialMediaLink | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError(null)
    setIsFormOpen(true)
  }

  const openEdit = (link: SocialMediaLink) => {
    setEditing(link)
    setForm({ platform: link.platform, link: link.link, icon: undefined })
    setFormError(null)
    setIsFormOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.platform.trim() || !form.link.trim()) {
      setFormError('اسم المنصة والرابط حقلان مطلوبان')
      return
    }
    setIsSubmitting(true)
    setFormError(null)
    try {
      const payload = { platform: form.platform.trim(), link: form.link.trim(), icon: form.icon }
      if (editing) {
        await socialMediaApi.update(editing.id, payload)
        toast.success('تم تحديث الرابط بنجاح')
      } else {
        await socialMediaApi.create(payload)
        toast.success('تم إضافة الرابط بنجاح')
      }
      setIsFormOpen(false)
      mutate()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'تعذر حفظ الرابط')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await socialMediaApi.remove(deleteTarget.id)
      toast.success('تم حذف الرابط بنجاح')
      setDeleteTarget(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف الرابط')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: DataTableColumn<SocialMediaLink>[] = [
    { key: 'id', header: '#' },
    { key: 'platform', header: 'المنصة' },
    {
      key: 'link',
      header: 'الرابط',
      render: (row) => (
        <a href={row.link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
          {row.link}
        </a>
      ),
    },
  ]

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={links}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل روابط التواصل' : null}
        searchableFields={['platform']}
        searchPlaceholder="بحث باسم المنصة..."
        toolbar={
          <Button onClick={openCreate} className="gap-2">
            <Icon icon="solar:add-circle-line-duotone" height={18} />
            إضافة رابط
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
        title={editing ? 'تعديل رابط التواصل' : 'إضافة رابط تواصل جديد'}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        {formError && <p className="text-error text-sm">{formError}</p>}
        <div>
          <Label htmlFor="sm-platform" className="mb-2 block">المنصة</Label>
          <Input id="sm-platform" value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))} placeholder="فيسبوك، انستغرام..." required />
        </div>
        <div>
          <Label htmlFor="sm-link" className="mb-2 block">الرابط</Label>
          <Input id="sm-link" type="url" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://" required />
        </div>
        <div>
          <Label htmlFor="sm-icon" className="mb-2 block">
            الأيقونة {editing && '(اتركها فارغة للإبقاء على الأيقونة الحالية)'}
          </Label>
          <Input id="sm-icon" type="file" accept="image/*" onChange={(e) => setForm((f) => ({ ...f, icon: e.target.files?.[0] }))} />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="حذف الرابط"
        description={`هل أنت متأكد من حذف رابط "${deleteTarget?.platform}"؟`}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default SocialMediaApp
