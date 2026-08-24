'use client'

import { useState } from 'react'
import useSWR from 'swr'
import CardBox from '@/app/components/shared/CardBox'
import { DataTable, type DataTableColumn } from '@/app/components/shared/DataTable'
import { ConfirmDialog } from '@/app/components/shared/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Icon } from '@iconify/react'
import { clientApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'
import type { Client, ClientStatement } from '@/lib/api/types'

const ClientsApp = () => {
  const toast = useToast()
  const { data: clients, error, isLoading, mutate } = useSWR('admin-clients', () => clientApi.list())
  const rows = clients ?? []

  const [togglingId, setTogglingId] = useState<number | null>(null)

  const toggleActive = async (client: Client) => {
    setTogglingId(client.id)
    try {
      await clientApi.toggleActive(client.id)
      toast.success('تم تحديث حالة تفعيل العميل')
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر تحديث حالة العميل')
    } finally {
      setTogglingId(null)
    }
  }

  const togglePayLater = async (client: Client) => {
    setTogglingId(client.id)
    try {
      await clientApi.toggleCanPayLater(client.id)
      toast.success('تم تحديث خيار الدفع الآجل')
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر تحديث خيار الدفع الآجل')
    } finally {
      setTogglingId(null)
    }
  }

  // Statements management
  const [statementsClient, setStatementsClient] = useState<Client | null>(null)
  const [statementTitle, setStatementTitle] = useState('')
  const [statementFile, setStatementFile] = useState<File | undefined>()
  const [isUploading, setIsUploading] = useState(false)
  const [deleteStatement, setDeleteStatement] = useState<ClientStatement | null>(null)
  const [isDeletingStatement, setIsDeletingStatement] = useState(false)

  const openStatements = (client: Client) => {
    setStatementsClient(client)
    setStatementTitle('')
    setStatementFile(undefined)
  }

  const uploadStatement = async () => {
    if (!statementsClient || !statementFile || !statementTitle.trim()) return
    setIsUploading(true)
    try {
      await clientApi.createStatement(statementsClient.id, { file: statementFile, titile: statementTitle.trim() })
      toast.success('تم رفع كشف الحساب بنجاح')
      setStatementTitle('')
      setStatementFile(undefined)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر رفع كشف الحساب')
    } finally {
      setIsUploading(false)
    }
  }

  const confirmDeleteStatement = async () => {
    if (!deleteStatement) return
    setIsDeletingStatement(true)
    try {
      await clientApi.deleteStatement(deleteStatement.id)
      toast.success('تم حذف كشف الحساب بنجاح')
      setDeleteStatement(null)
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حذف كشف الحساب')
    } finally {
      setIsDeletingStatement(false)
    }
  }

  const columns: DataTableColumn<Client>[] = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'الاسم' },
    { key: 'phone', header: 'الهاتف' },
    {
      key: 'is_active',
      header: 'مفعّل',
      render: (row) => (
        <Switch
          checked={Boolean(row.is_active)}
          disabled={togglingId === row.id}
          onCheckedChange={() => toggleActive(row)}
        />
      ),
    },
    {
      key: 'can_pay_later',
      header: 'الدفع الآجل',
      render: (row) => (
        <Switch
          checked={Boolean(row.can_pay_later)}
          disabled={togglingId === row.id}
          onCheckedChange={() => togglePayLater(row)}
        />
      ),
    },
  ]

  const currentStatements = statementsClient?.statements ?? []

  return (
    <CardBox className="bg-background">
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        isLoading={isLoading}
        error={error instanceof ApiError ? error.message : error ? 'تعذر تحميل العملاء' : null}
        searchableFields={['name', 'phone']}
        searchPlaceholder="بحث بالاسم أو الهاتف..."
        actions={(row) => (
          <Button size="sm" variant="outline" onClick={() => openStatements(row)} className="gap-2">
            <Icon icon="solar:document-text-line-duotone" height={16} />
            كشوفات الحساب
          </Button>
        )}
      />

      <Dialog open={Boolean(statementsClient)} onOpenChange={(open) => !open && setStatementsClient(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>كشوفات حساب — {statementsClient?.name}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            {currentStatements.length === 0 ? (
              <p className="text-sm text-link dark:text-darklink">لا توجد كشوفات حساب مرفوعة بعد</p>
            ) : (
              currentStatements.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3 rounded-md border border-ld px-3 py-2">
                  <a href={s.file} target="_blank" rel="noreferrer" className="text-primary text-sm hover:underline truncate">
                    {s.title}
                  </a>
                  <Button size="sm" variant="ghosterror" onClick={() => setDeleteStatement(s)}>
                    <Icon icon="solar:trash-bin-trash-line-duotone" height={16} />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-ld pt-4 flex flex-col gap-3">
            <Label className="block">رفع كشف حساب جديد</Label>
            <Input
              placeholder="عنوان الكشف"
              value={statementTitle}
              onChange={(e) => setStatementTitle(e.target.value)}
            />
            <Input type="file" onChange={(e) => setStatementFile(e.target.files?.[0])} />
            <DialogFooter>
              <Button
                onClick={uploadStatement}
                disabled={isUploading || !statementFile || !statementTitle.trim()}
              >
                {isUploading ? 'جارٍ الرفع...' : 'رفع الملف'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleteStatement)}
        onOpenChange={(open) => !open && setDeleteStatement(null)}
        title="حذف كشف الحساب"
        description={`هل أنت متأكد من حذف "${deleteStatement?.title}"؟`}
        onConfirm={confirmDeleteStatement}
        isConfirming={isDeletingStatement}
        confirmLabel="حذف"
      />
    </CardBox>
  )
}

export default ClientsApp
