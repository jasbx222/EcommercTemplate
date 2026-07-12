"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Calendar1, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "النماذج" },
];

const Page = () => {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [website, setWebsite] = useState("https://matdash-nextjs-main.vercel.app/");
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(website);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <BreadcrumbComp title="عناصر النماذج" items={BCrumb} />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          {/* Default Inputs */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">الحقول الافتراضية</h5>
            <div className="mt-6 flex flex-col gap-6">
              {/* Basic Input */}
              <div>
                <Label htmlFor="name">إدخال</Label>
                <Input id="name" type="text" required className="mt-2" />
              </div>

              {/* Input with placeholder */}
              <div>
                <Label htmlFor="firstname">إدخال مع نص توضيحي</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="الاسم الأول"
                  required
                  className="mt-2"
                />
              </div>

              {/* Select */}
              <div>
                <Label htmlFor="countries">قائمة اختيار</Label>
                <Select>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="اختر خيارًا" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">الولايات المتحدة</SelectItem>
                    <SelectItem value="ca">كندا</SelectItem>
                    <SelectItem value="fr">فرنسا</SelectItem>
                    <SelectItem value="de">ألمانيا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">حقل كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  required
                  className="mt-2"
                />
              </div>

              {/* Datepicker */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  تاريخ الميلاد
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal hover:bg-transparent focus:border-primary"
                    >
                      {date ? date.toLocaleDateString() : "اختر تاريخًا"}
                      <Icon icon="solar:calendar-minimalistic-linear" width={18} height={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div>
                <Label htmlFor="time">منتقي الوقت</Label>
                <div className="relative mt-2">
                  <Input
                    id="time"
                    type="time"
                    min="09:00"
                    max="18:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="pe-10 [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                  <Icon icon="solar:clock-circle-linear" width="18" height="18" className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Card Input with Icon */}
              <div>
                <Label htmlFor="card">البطاقة</Label>
                <div className="relative mt-2">
                  <Icon
                    icon="uim:master-card"
                    width="20"
                    height="20"
                    className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <Input id="card" type="text" placeholder="رقم البطاقة" className="ps-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">حقل النص الطويل</h5>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <Label htmlFor="comment">الوصف</Label>
                <Textarea id="comment" placeholder="اترك تعليقًا..." rows={4} />
              </div>

              <div>
                <Label htmlFor="disabled-comment">الوصف</Label>
                <Textarea id="disabled-comment" placeholder="معطل" disabled rows={4} />
              </div>

              <div>
                <Label htmlFor="error-comment" className="text-red-600">الوصف</Label>
                <Textarea
                  id="error-comment"
                  placeholder="اترك تعليقًا..."
                  rows={4}
                  className="border-red-600 text-red-600 focus-visible:border-red-600"
                />
              </div>
            </div>
          </div>

          {/* Input Colors */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">ألوان الحقول</h5>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <Label htmlFor="warning" className="text-warning">
                  تحذير
                </Label>
                <Input id="warning" placeholder="حقل تحذير" variant={"warning"} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="info" className="text-info">
                  معلومات
                </Label>
                <Input id="info" placeholder="حقل معلومات" variant={"info"} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="success" className="text-success">
                  نجاح
                </Label>
                <Input id="success" placeholder="حقل نجاح" variant={"success"} className="mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-6">
          {/* Input Group with Icons */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">مجموعة الحقول</h5>
            <div className="mt-6 flex flex-col gap-6">
              <div className="relative">
                <Icon icon="solar:letter-linear" width={18} height={18} className="absolute start-3 top-1/2 -translate-y-1/2" />
                <Input type="email" placeholder="name@example.com" className="ps-10" />
              </div>

              <div className="relative">
                <Icon icon="solar:phone-rounded-linear" width={18} height={18} className="absolute start-3 top-1/2 -translate-y-1/2" />
                <Input type="tel" placeholder="+1" className="ps-10" />
              </div>

              <div className="relative">
                <Icon icon="solar:global-linear" width={18} height={18} className="absolute start-3 top-1/2 -translate-y-1/2" />
                <Input type="text" placeholder="www.example.com" className="ps-10" />
              </div>

              <div className="relative">
                <Icon icon="solar:link-round-angle-linear" width={18} height={18} className="absolute start-3 top-1/2 -translate-y-1/2" />
                <Input type="text" placeholder="https://matdash-nextjs-main.vercel.app/" className="ps-10" />
              </div>

              {/* Copy input */}
              <div>
                <Label htmlFor="website">الموقع الإلكتروني</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-2 text-sm rounded-full border border-ld bg-primary/10 dark:bg-primary/10 text-primary hover:bg-gray-200"
                  >
                    {copied ? "تم النسخ" : "نسخ"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Input */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">حقل الملف</h5>
            <Input type="file" className="mt-6" />
          </div>

          {/* Checkbox */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">خانة الاختيار</h5>
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Checkbox id="default" />
                <Label htmlFor="default">افتراضي</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="checked" defaultChecked />
                <Label htmlFor="checked">محدد</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled">معطل</Label>
              </div>
            </div>
          </div>

          {/* Radio */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">أزرار الاختيار</h5>
            <RadioGroup defaultValue="default" className="mt-6 flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default">افتراضي</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="selected" id="selected" />
                <Label htmlFor="selected">محدد</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="disabled" id="disabled" disabled />
                <Label htmlFor="disabled">معطل</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Switch */}
          <div className="rounded-xl shadow-xs bg-background md:p-6 p-4">
            <h5 className="card-title">مفتاح التبديل</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Switch checked={switch1} onCheckedChange={setSwitch1} />
                <Label>بدّلني</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={switch2} onCheckedChange={setSwitch2} />
                <Label>بدّلني (مُفعّل)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch disabled />
                <Label>معطل</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked disabled />
                <Label>معطل (مُفعّل)</Label>
              </div>
              <Switch checked={switch3} onCheckedChange={setSwitch3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
