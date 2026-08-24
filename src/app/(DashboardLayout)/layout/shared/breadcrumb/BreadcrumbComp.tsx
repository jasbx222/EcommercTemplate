'use client'

import CardBox from '@/app/components/shared/CardBox'
import { JSX } from 'react'

interface BreadCrumbType {
  subtitle?: string
  items?: any[]
  title: string
  children?: JSX.Element
}

const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  return (
    <>
      <CardBox
        className={`mb-6 py-4 bg-lightprimary dark:bg-darkinfo overflow-hidden rounded-xl border-none !shadow-none dark:!shadow-none`}>
        <div>
          <h4 className='font-semibold text-xl text-customdark mb-3'>
            {title}
          </h4>
          <ol
            className='flex items-center whitespace-nowrap'
            aria-label='Breadcrumb'>
            <li className='flex items-center'>
              <a
                className='opacity-80 text-sm text-charcoal leading-none'
                href='@@webRoot/main/index.html'>
                الرئيسية
              </a>
            </li>
            <li>
              <div className='p-0.5 rounded-full bg-dark dark:bg-darklink mx-2.5 flex items-center'></div>
            </li>
            <li
              className='flex items-center text-sm text-charcoal leading-none'
              aria-current='page'>
              {title}
            </li>
          </ol>
        </div>
      </CardBox>
    </>
  )
}

export default BreadcrumbComp
