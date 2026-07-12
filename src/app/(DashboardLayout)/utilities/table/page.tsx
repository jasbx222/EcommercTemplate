"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import product1 from "../../../../../public/images/products/dash-prd-1.jpg";
import product2 from "../../../../../public/images/products/dash-prd-2.jpg";
import product3 from "../../../../../public/images/products/dash-prd-3.jpg";
import product4 from "../../../../../public/images/products/dash-prd-4.jpg";
import product5 from "../../../../../public/images/products/s5.jpg";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";

const PopularProducts = () => {
  const ProductTableData = [
    {
      img: product1,
      name: "آيفون 13 برو ماكس - أزرق المحيط الهادئ - تخزين 128 جيجابايت",
      payment: "$180",
      paymentstatus: "مدفوع جزئيًا",
      process: 45,
      processcolor: "bg-warning",
      statuscolor: "secondary",
      statustext: "مؤكد",
      progessvariant: "warning",
      bedgevariant: "lightSuccess"
    },
    {
      img: product2,
      name: "آبل ماك بوك برو 13 بوصة - M1 - 8/256 جيجابايت - رمادي فضائي",
      payment: "$120",
      paymentstatus: "مدفوع بالكامل",
      process: 100,
      processcolor: "bg-success",
      statuscolor: "success",
      statustext: "مؤكد",
      progessvariant: "progress",
      bedgevariant: "lightSuccess"
    },
    {
      img: product3,
      name: "يد تحكم لاسلكية PlayStation 5 DualSense",
      payment: "$120",
      paymentstatus: "ملغى",
      process: 100,
      processcolor: "bg-error",
      statuscolor: "error",
      statustext: "ملغى",
      progessvariant: "error",
      bedgevariant: "lightError"
    },
    {
      img: product5,
      name: "كرسي مكتب دوار متوسط الظهر شبكي من Amazon Basics",
      payment: "$120",
      paymentstatus: "مدفوع جزئيًا",
      process: 45,
      processcolor: "bg-warning",
      statuscolor: "secondary",
      statustext: "مؤكد",
      progessvariant: "warning",
      bedgevariant: "lightSuccess"
    },
    {
      img: product4,
      name: "تلفزيون Sony X85J الذكي مقاس 75 بوصة 4K Ultra HD LED",
      payment: "$120",
      paymentstatus: "مدفوع بالكامل",
      process: 100,
      processcolor: "bg-success",
      statuscolor: "success",
      statustext: "مؤكد",
      progessvariant: "progress",
      bedgevariant: "lightSuccess"
    },
  ];

  const tableActionData = [
    { icon: "solar:add-circle-outline", listtitle: "إضافة" },
    { icon: "solar:pen-new-square-broken", listtitle: "تعديل" },
    { icon: "solar:trash-bin-minimalistic-outline", listtitle: "حذف" },
  ];

  const BCrumb = [
    {
      to: "/",
      title: "الرئيسية",
    },
    {
      title: "الجدول",
    },
  ];

  return (
    <>
      <BreadcrumbComp title="الجدول" items={BCrumb} />
      <div className="rounded-xl bg-background p-6 relative w-full words-break shadow-xs">
        <h5 className="card-title">الجدول</h5>
        <div className="mt-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-6">المنتجات</TableHead>
                <TableHead>الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-end"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ProductTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap ps-6">
                    <div className="flex gap-3 items-center">
                      <Image
                        src={item.img}
                        alt="icon"
                        className="h-[60px] w-[60px] rounded-md"
                      />
                      <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                        <h6 className="text-sm">{item.name}</h6>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <h5 className="text-base text-wrap">
                      {item.payment}
                      <span className="text-dark dark:text-darklink opacity-70">
                        <span className="mx-1">/</span>499
                      </span>
                    </h5>
                    <div className="text-sm font-medium text-dark dark:text-darklink opacity-70 mb-2 text-wrap">
                      {item.paymentstatus}
                    </div>

                    <Progress
                      variant={item?.progessvariant as any}
                      value={item.process}
                      className={`${item.processcolor}`}
                    />
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={item?.bedgevariant as BadgeProps["variant"]}
                    >
                      {item.statustext}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                          <HiOutlineDotsVertical size={22} />
                        </span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {tableActionData.map((action, idx) => (
                          <DropdownMenuItem
                            key={idx}
                            className="flex gap-3 items-center cursor-pointer"
                          >
                            <Icon icon={action.icon} height={18} />
                            <span>{action.listtitle}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PopularProducts;
