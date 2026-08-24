"use client";

import Link from "next/link";

const FullLogo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 select-none">
      <span className="h-9 w-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-base shrink-0">
        BT
      </span>
      <span className="text-xl font-bold text-primary tracking-tight">
        BandTech
      </span>
    </Link>
  );
};

export default FullLogo;
