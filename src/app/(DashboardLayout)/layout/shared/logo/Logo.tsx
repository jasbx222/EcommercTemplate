'use client'

import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="flex items-center justify-center select-none">
      <span className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
        BT
      </span>
    </Link>
  )
}

export default Logo
