'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CardBox from '@/app/components/shared/CardBox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactInfoApi, systemParameterApi, termsApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { useToast } from '@/app/context/ToastContext'

function ContactInfoTab() {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-contact-info', () => contactInfoApi.get())
  const [whatsappLink, setWhatsappLink] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (data?.whatsappLink !== undefined) setWhatsappLink(data.whatsappLink)
  }, [data])

  const handleSave = async () => {
    if (!data?.id) return
    setIsSaving(true)
    try {
      await contactInfoApi.update(data.id, whatsappLink)
      toast.success('تم حفظ معلومات التواصل بنجاح')
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حفظ معلومات التواصل')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <p className="text-sm text-link dark:text-darklink">جارٍ التحميل...</p>
  if (error) return <p className="text-error text-sm">{error instanceof ApiError ? error.message : 'تعذر تحميل البيانات'}</p>
  if (!data?.id) return <p className="text-sm text-link dark:text-darklink">لا يوجد سجل معلومات تواصل بعد</p>

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <div>
        <Label htmlFor="whatsapp-link" className="mb-2 block">رابط واتساب</Label>
        <Input id="whatsapp-link" value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} placeholder="https://wa.me/..." />
      </div>
      <Button onClick={handleSave} disabled={isSaving} className="w-fit">
        {isSaving ? 'جارٍ الحفظ...' : 'حفظ'}
      </Button>
    </div>
  )
}

function TermsTab() {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-terms', () => termsApi.get())
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setTitle(data.title ?? '')
      setContent(data.content ?? '')
    }
  }, [data])

  const handleSave = async () => {
    if (!data?.id) return
    setIsSaving(true)
    try {
      await termsApi.update(data.id, { title, content })
      toast.success('تم حفظ الشروط والأحكام بنجاح')
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حفظ الشروط والأحكام')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <p className="text-sm text-link dark:text-darklink">جارٍ التحميل...</p>
  if (error) return <p className="text-error text-sm">{error instanceof ApiError ? error.message : 'تعذر تحميل البيانات'}</p>
  if (!data?.id) return <p className="text-sm text-link dark:text-darklink">لا يوجد سجل شروط وأحكام بعد</p>

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div>
        <Label htmlFor="terms-title" className="mb-2 block">العنوان</Label>
        <Input id="terms-title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="terms-content" className="mb-2 block">المحتوى</Label>
        <Textarea id="terms-content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
      </div>
      <Button onClick={handleSave} disabled={isSaving} className="w-fit">
        {isSaving ? 'جارٍ الحفظ...' : 'حفظ'}
      </Button>
    </div>
  )
}

const emptySystemParams = {
  main_app_version: '',
  app_android_link: '',
  app_android_direct_link: '',
  app_ios_link: '',
  ios_test: '',
  main_app_version_ios: '',
}

function SystemParametersTab() {
  const toast = useToast()
  const { data, error, isLoading, mutate } = useSWR('admin-system-parameters', () => systemParameterApi.list())
  const record = data?.[0]
  const [form, setForm] = useState(emptySystemParams)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (record) {
      setForm({
        main_app_version: record.main_app_version ?? '',
        app_android_link: record.app_android_link ?? '',
        app_android_direct_link: record.app_android_direct_link ?? '',
        app_ios_link: record.app_ios_link ?? '',
        ios_test: record.ios_test !== undefined ? String(record.ios_test) : '',
        main_app_version_ios: record.main_app_version_ios ?? '',
      })
    }
  }, [record])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (record) {
        await systemParameterApi.update(form)
        toast.success('تم تحديث معاملات النظام بنجاح')
      } else {
        await systemParameterApi.create(form)
        toast.success('تم إنشاء معاملات النظام بنجاح')
      }
      mutate()
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذر حفظ معاملات النظام')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <p className="text-sm text-link dark:text-darklink">جارٍ التحميل...</p>
  if (error) return <p className="text-error text-sm">{error instanceof ApiError ? error.message : 'تعذر تحميل البيانات'}</p>

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sp-version" className="mb-2 block">إصدار التطبيق (أندرويد)</Label>
          <Input id="sp-version" value={form.main_app_version} onChange={(e) => setForm((f) => ({ ...f, main_app_version: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="sp-version-ios" className="mb-2 block">إصدار التطبيق (آيفون)</Label>
          <Input id="sp-version-ios" value={form.main_app_version_ios} onChange={(e) => setForm((f) => ({ ...f, main_app_version_ios: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="sp-android-link" className="mb-2 block">رابط أندرويد (المتجر)</Label>
          <Input id="sp-android-link" value={form.app_android_link} onChange={(e) => setForm((f) => ({ ...f, app_android_link: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="sp-android-direct" className="mb-2 block">رابط أندرويد (مباشر)</Label>
          <Input id="sp-android-direct" value={form.app_android_direct_link} onChange={(e) => setForm((f) => ({ ...f, app_android_direct_link: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="sp-ios-link" className="mb-2 block">رابط آيفون</Label>
          <Input id="sp-ios-link" value={form.app_ios_link} onChange={(e) => setForm((f) => ({ ...f, app_ios_link: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="sp-ios-test" className="mb-2 block">وضع اختبار iOS</Label>
          <Input id="sp-ios-test" value={form.ios_test} onChange={(e) => setForm((f) => ({ ...f, ios_test: e.target.value }))} placeholder="0 أو 1" />
        </div>
      </div>
      <Button onClick={handleSave} disabled={isSaving} className="w-fit">
        {isSaving ? 'جارٍ الحفظ...' : record ? 'تحديث' : 'إنشاء'}
      </Button>
    </div>
  )
}

const SettingsApp = () => {
  return (
    <CardBox className="bg-background">
      <Tabs defaultValue="contact-info">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="contact-info">معلومات التواصل</TabsTrigger>
          <TabsTrigger value="terms">الشروط والأحكام</TabsTrigger>
          <TabsTrigger value="system-parameters">معاملات النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="contact-info" className="mt-4">
          <ContactInfoTab />
        </TabsContent>
        <TabsContent value="terms" className="mt-4">
          <TermsTab />
        </TabsContent>
        <TabsContent value="system-parameters" className="mt-4">
          <SystemParametersTab />
        </TabsContent>
      </Tabs>
    </CardBox>
  )
}

export default SettingsApp
