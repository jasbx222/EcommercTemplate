'use client'

import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import CardBox from '../shared/CardBox'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Login = () => {
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
                <Label htmlFor='username1' className='font-medium'>
                  اسم المستخدم
                </Label>
              </div>
              <Input
                id='username1'
                type='text'
                placeholder='أدخل اسم المستخدم'
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
            <div className='flex flex-wrap gap-6 items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Checkbox id='remember' checked />
                <Label
                  className='text-link font-normal text-sm'
                  htmlFor='remember'>
                  تذكر هذا الجهاز
                </Label>
              </div>
              <Link
                href='#'
                className='text-sm font-medium text-primary hover:text-primaryemphasis'>
                هل نسيت كلمة المرور؟
              </Link>
            </div>
            <Button className='w-full' asChild>
              <Link href='/'>تسجيل الدخول</Link>
            </Button>
            <div className='flex items center gap-2 justify-center mt-6 flex-wrap'>
              <p className='text-base font-medium text-link dark:text-darklink'>
                جديد على Matdash؟
              </p>
              <Link
                href='/auth/register'
                className='text-sm font-medium text-primary hover:text-primaryemphasis'>
                إنشاء حساب
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  )
}
