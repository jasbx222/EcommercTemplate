'use client'

import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import CardBox from '../shared/CardBox'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Register = () => {
  return (
    <>
      <div className='h-screen w-full flex justify-center items-center bg-lightprimary'>
        <div className='md:min-w-[450px] min-w-max'>
          <CardBox>
            <div className='flex justify-center mb-4'>
              <FullLogo />
            </div>
            <p className='text-sm text-charcoal text-center mb-6'>
              حملاتك الاجتماعية
            </p>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name1' className='font-medium'>
                  الاسم
                </Label>
              </div>
              <Input
                id='name1'
                type='text'
                placeholder='أدخل اسمك'
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email1' className='font-medium'>
                  البريد الإلكتروني
                </Label>
              </div>
              <Input
                id='email1'
                type='email'
                placeholder='أدخل بريدك الإلكتروني'
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='password1' className='font-medium'>
                  كلمة المرور
                </Label>
              </div>
              <Input
                id='password1'
                type='password'
                placeholder='أدخل كلمة المرور'
                required
              />
            </div>
            <Button className='w-full' asChild>
              <Link href='/'>إنشاء حساب</Link>
            </Button>
            <div className='flex items center gap-2 justify-center mt-6 flex-wrap'>
              <p className='text-base font-medium text-link dark:text-darklink'>
                لديك حساب بالفعل؟
              </p>
              <Link
                href='/auth/login'
                className='text-sm font-medium text-primary hover:text-primaryemphasis'>
                تسجيل الدخول
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  )
}
