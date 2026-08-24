import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'خطأ - 404',
  description: 'تم إنشاؤه بواسطة create next app',
}
const Error = () => {
  return (
    <>
      <div className='h-screen flex items-center justify-center bg-background'>
        <div className='text-center'>
          <Image
            src={'/images/backgrounds/errorimg.svg'}
            alt='خطأ'
            className='mb-4'
            width={400}
            height={300}
          />
          <h1 className='text-ld text-4xl mb-6'>عذرًا!!!</h1>
          <h6 className='text-xl text-ld'>
            الصفحة التي تبحث عنها غير موجودة.
          </h6>
          <Button
            asChild
            className="mt-6 mx-auto"
          >
            <Link href="/">
              العودة إلى الرئيسية
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Error
