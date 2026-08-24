"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const Profile = () => {
  const { logout, admin } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      router.replace("/auth/login");
    }
  };

  return (
    <div className="relative group/menu">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              src="/images/profile/user-1.jpg"
              alt="الملف الشخصي"
              height={35}
              width={35}
              className="rounded-full"
            />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 rounded-sm shadow-md p-2"
        >
          {admin?.email && (
            <div className="px-3 py-2 text-sm text-link dark:text-darklink truncate">
              {admin.email}
            </div>
          )}

          <div className="p-3 pt-0">
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              disabled={isLoggingOut}
              onClick={handleLogout}
            >
              {isLoggingOut ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
