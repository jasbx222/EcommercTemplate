"use client";
import Image from "next/image"
import CardBox from "../shared/CardBox"
import Link from "next/link"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"personal" | "address" | null>(null);

    const BCrumb = [
        {
            to: "/",
            title: "الرئيسية",
        },
        {
            title: "الملف الشخصي",
        },
    ];

    const [personal, setPersonal] = useState({
        firstName: "ماثيو",
        lastName: "أندرسون",
        email: "mathew.anderson@gmail.com",
        phone: "(347) 528-1947",
        position: "قائد فريق",
        facebook: "#!",
        twitter: "#!",
        github: "#!",
        dribbble: "#!"
    });

    const [address, setAddress] = useState({
        location: "الولايات المتحدة",
        state: "سان دييغو، كاليفورنيا، الولايات المتحدة",
        pin: "92101",
        zip: "30303",
        taxNo: "GA45273910"
    });

    const [tempPersonal, setTempPersonal] = useState(personal);
    const [tempAddress, setTempAddress] = useState(address);

    useEffect(() => {
        if (openModal && modalType === "personal") {
            setTempPersonal(personal);
        }
        if (openModal && modalType === "address") {
            setTempAddress(address);
        }
    }, [openModal, modalType, personal, address]);

    const handleSave = () => {
        if (modalType === "personal") {
            setPersonal(tempPersonal);
        } else if (modalType === "address") {
            setAddress(tempAddress);
        }
        setOpenModal(false);
    };

    const socialLinks = [
        { href: "#!", icon: "streamline-logos:facebook-logo-2-solid" },
        { href: "#!", icon: "streamline-logos:x-twitter-logo-solid" },
        { href: "#!", icon: "ion:logo-github" },
        { href: "#!", icon: "streamline-flex:dribble-logo-remix" },
    ];

    return (
        <>
            <BreadcrumbComp title="الملف الشخصي" items={BCrumb} />
            <div className="flex flex-col gap-6">
                <CardBox className="p-6 bg-background overflow-hidden border-none rounded-xl shadow-xs">
                    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl relative w-full words-break">
                        <div>
                            <Image src={"/matdash-nextjs/images/profile/user-1.jpg"} alt="image" width={80} height={80} className="rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
                            <div className="flex flex-col sm:text-start text-center gap-1.5">
                                <h5 className="card-title">{personal.firstName} {personal.lastName}</h5>
                                <div className="flex flex-wrap items-center gap-1 md:gap-3">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{personal.position}</p>
                                    <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{address.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {socialLinks.map((item, index) => (
                                    <Link key={index} href={item.href} target="_blank" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                        <Icon icon={item.icon} width="20" height="20" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardBox>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="space-y-6 rounded-xl shadow-xs bg-background md:p-6 p-4 relative w-full words-break">
                        <h5 className="card-title">المعلومات الشخصية</h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div><p className="text-xs text-gray-500">الاسم الأول</p><p>{personal.firstName}</p></div>
                            <div><p className="text-xs text-gray-500">اسم العائلة</p><p>{personal.lastName}</p></div>
                            <div><p className="text-xs text-gray-500">البريد الإلكتروني</p><p>{personal.email}</p></div>
                            <div><p className="text-xs text-gray-500">الهاتف</p><p>{personal.phone}</p></div>
                            <div><p className="text-xs text-gray-500">المنصب</p><p>{personal.position}</p></div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => { setModalType("personal"); setOpenModal(true); }} color={"primary"} className="flex items-center gap-1.5 rounded-md">
                                <Icon icon="ic:outline-edit" width="18" height="18" /> تعديل
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6 rounded-xl shadow-xs bg-background md:p-6 p-4 relative w-full words-break">
                        <h5 className="card-title">تفاصيل العنوان</h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div><p className="text-xs text-gray-500">الموقع</p><p>{address.location}</p></div>
                            <div><p className="text-xs text-gray-500">المحافظة / الولاية</p><p>{address.state}</p></div>
                            <div><p className="text-xs text-gray-500">رمز PIN</p><p>{address.pin}</p></div>
                            <div><p className="text-xs text-gray-500">الرمز البريدي</p><p>{address.zip}</p></div>
                            <div><p className="text-xs text-gray-500">الرقم الضريبي الفيدرالي</p><p>{address.taxNo}</p></div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => { setModalType("address"); setOpenModal(true); }} color={"primary"} className="flex items-center gap-1.5 rounded-md">
                                <Icon icon="ic:outline-edit" width="18" height="18" /> تعديل
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="mb-4">
                            {modalType === "personal" ? "تعديل المعلومات الشخصية" : "تعديل تفاصيل العنوان"}
                        </DialogTitle>
                    </DialogHeader>

                    {modalType === "personal" ? (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="firstName">الاسم الأول</Label>
                                <Input
                                    id="firstName"
                                    placeholder="الاسم الأول"
                                    value={tempPersonal.firstName}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, firstName: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="lastName">اسم العائلة</Label>
                                <Input
                                    id="lastName"
                                    placeholder="اسم العائلة"
                                    value={tempPersonal.lastName}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, lastName: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    placeholder="البريد الإلكتروني"
                                    value={tempPersonal.email}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, email: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone">الهاتف</Label>
                                <Input
                                    id="phone"
                                    placeholder="الهاتف"
                                    value={tempPersonal.phone}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, phone: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="position">المنصب</Label>
                                <Input
                                    id="position"
                                    placeholder="المنصب"
                                    value={tempPersonal.position}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, position: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="facebook">رابط Facebook</Label>
                                <Input
                                    id="facebook"
                                    placeholder="رابط Facebook"
                                    value={tempPersonal.facebook}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, facebook: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="twitter">رابط Twitter</Label>
                                <Input
                                    id="twitter"
                                    placeholder="رابط Twitter"
                                    value={tempPersonal.twitter}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, twitter: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="github">رابط GitHub</Label>
                                <Input
                                    id="github"
                                    placeholder="رابط GitHub"
                                    value={tempPersonal.github}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, github: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="dribbble">رابط Dribbble</Label>
                                <Input
                                    id="dribbble"
                                    placeholder="رابط Dribbble"
                                    value={tempPersonal.dribbble}
                                    onChange={(e) => setTempPersonal({ ...tempPersonal, dribbble: e.target.value })}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="location">الموقع</Label>
                                <Input
                                    id="location"
                                    placeholder="الموقع"
                                    value={tempAddress.location}
                                    onChange={(e) => setTempAddress({ ...tempAddress, location: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="state">المحافظة / الولاية</Label>
                                <Input
                                    id="state"
                                    placeholder="المحافظة / الولاية"
                                    value={tempAddress.state}
                                    onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="pin">رمز PIN</Label>
                                <Input
                                    id="pin"
                                    placeholder="رمز PIN"
                                    value={tempAddress.pin}
                                    onChange={(e) => setTempAddress({ ...tempAddress, pin: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="zip">الرمز البريدي</Label>
                                <Input
                                    id="zip"
                                    placeholder="الرمز البريدي"
                                    value={tempAddress.zip}
                                    onChange={(e) => setTempAddress({ ...tempAddress, zip: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="taxNo">الرقم الضريبي الفيدرالي</Label>
                                <Input
                                    id="taxNo"
                                    placeholder="الرقم الضريبي الفيدرالي"
                                    value={tempAddress.taxNo}
                                    onChange={(e) => setTempAddress({ ...tempAddress, taxNo: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 mt-4">
                        <Button color={"primary"} className="rounded-md" onClick={handleSave}>
                            حفظ التغييرات
                        </Button>
                        <Button color={"lighterror"} className="rounded-md bg-lighterror dark:bg-darkerror text-error hover:bg-error hover:text-white" onClick={() => setOpenModal(false)}>
                            إغلاق
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserProfile;
