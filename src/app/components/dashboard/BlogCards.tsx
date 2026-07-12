"use client";
import Image from "next/image";
import { TbPoint } from "react-icons/tb";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const BlogCardsData = [
  {
    avatar: "/matdash-nextjs/images/profile/user-2.jpg",
    coveravatar: "/matdash-nextjs/images/blog/blog-img1.jpg",
    read: "قراءة دقيقتين",
    title: "مع تراجع الين، يتجه اليابانيون الشغوفون بالتقنية إلى هواتف آيفون المستعملة",
    category: "اجتماعي",
    name: "جورجيانا راميرو",
    view: "9,125",
    comments: "3",
    time: "الإثنين، 19 ديسمبر",
    url: "",
  },
  {
    avatar: "/matdash-nextjs/images/profile/user-3.jpg",
    coveravatar: "/matdash-nextjs/images/blog/blog-img2.jpg",
    read: "قراءة دقيقتين",
    title: "إنتل تخسر محاولتها لإحياء دعوى مكافحة الاحتكار ضد شركة فورتريس المنافسة في براءات الاختراع",
    category: "أجهزة",
    name: "جورجيانا راميرو",
    view: "4,150",
    comments: "38",
    time: "الأحد، 18 ديسمبر",
    url: "",
  },
  {
    avatar: "/matdash-nextjs/images/profile/user-4.jpg",
    coveravatar: "/matdash-nextjs/images/blog/blog-img3.jpg",
    read: "قراءة دقيقتين",
    title: "تفشي كوفيد يتفاقم مع اقتراب المزيد من الإغلاقات في الصين",
    category: "صحة",
    name: "جورجيانا راميرو",
    view: "9,480",
    comments: "12",
    time: "السبت، 17 ديسمبر",
    url: "",
  },
];

const BlogCards = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      {BlogCardsData.map((item, i) => (
        <div className="lg:col-span-4 col-span-12" key={i}>
          <Link href={item.url} className="group">
            <div className="rounded-xl dark:shadow-dark-md shadow-xs bg-white dark:bg-darkgray relative w-full overflow-hidden">
              {/* Blog Image */}
              <div className="relative">
                <Image
                  src={item.coveravatar}
                  alt="blog cover"
                  width={500}
                  height={240}
                  className="w-full object-cover"
                />
                {/* Read Time Badge */}
                <Badge variant={"gray"} className="absolute bottom-5 end-5">
                  {item.read}
                </Badge>
              </div>

              {/* Blog Content */}
              <div className="px-6 pb-6">
                {/* Author Avatar */}
                <Image
                  src={item.avatar}
                  className="h-10 w-10 rounded-full -mt-7 relative z-10"
                  alt="author"
                  width={40}
                  height={40}
                />

                {/* Category Badge */}
                <Badge variant={"gray"} className="mt-6">
                  {item.category}
                </Badge>

                {/* Title */}
                <h5 className="text-lg my-6 group-hover:text-primary line-clamp-2">
                  {item.title}
                </h5>

                {/* Stats Row */}
                <div className="flex">
                  <div className="flex gap-2 me-6 items-center">
                    <Icon
                      icon="solar:eye-outline"
                      height="18"
                      className="text-darklink"
                    />
                    <span className="text-sm text-darklink">{item.view}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Icon
                      icon="solar:chat-line-outline"
                      height="18"
                      className="text-darklink"
                    />
                    <span className="text-sm text-darklink">{item.comments}</span>
                  </div>

                  <div className="flex gap-1 items-center ms-auto">
                    <TbPoint size={15} className="text-darklink" />
                    <span className="text-sm text-darklink">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogCards;
