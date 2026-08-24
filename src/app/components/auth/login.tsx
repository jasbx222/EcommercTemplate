'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import CardBox from '../shared/CardBox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/app/context/AuthContext'
import { ApiError } from '@/lib/api/client'

export const Login = () => {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      router.replace('/')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'تعذر تسجيل الدخول، حاول مرة أخرى')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className='min-h-screen w-full flex justify-center items-center bg-lightprimary px-4 py-10'>
        <div className='w-full md:min-w-[450px] md:w-auto'>
          <CardBox>
            <div className='flex justify-center mb-4'>
              <FullLogo />
            </div>
            <p className='text-sm text-charcoal text-center mb-6'>
              تسجيل دخول لوحة تحكم مدار الأفكار
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='email' className='font-medium'>
                    البريد الإلكتروني
                  </Label>
                </div>
                <Input
                  id='email'
                  type='email'
                  placeholder='أدخل البريد الإلكتروني'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='username'
                  required
                />
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='password' className='font-medium'>
                    كلمة المرور
                  </Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='أدخل كلمة المرور'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  required
                />
              </div>
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
          </CardBox>
        </div>
      </div>
    </>
  )
}
