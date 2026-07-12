
import BreadcrumbComp from '@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp';
import BlogDetailData from '@/app/components/apps/blog/detail';
import React from 'react'
import { BlogProvider } from '@/app/context/BlogContext/index';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "تفاصيل المقال",
};

const BCrumb = [
  {
    to: "/",
    title: "الرئيسية",
  },
  {
    title: "تفاصيل المقال",
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogDetail = ({ params }: PageProps) => {
  return (
    <>
      <BlogProvider>
        <BreadcrumbComp title="تفاصيل المقال" items={BCrumb} />
        <BlogDetailData slug={params.slug} />
      </BlogProvider>
    </>
  )
}

export default BlogDetail

// Generate static params for static export
export async function generateStaticParams() {
  // Since we have static data, generate params for each post
  const posts = [
    { id: 1, title: "ساعة Garmin Instinct Crossover الذكية الهجينة القوية" },
    { id: 2, title: "بعد تسريحات تويتر، الموظفون الباقون يواجهون صمتاً تاماً" },
    { id: 3, title: "يبدو أن آبل تعمل على ميزات وصول جديدة ومبسطة في iOS" },
    { id: 4, title: "لماذا تُباع فيجما لشركة أدوبي مقابل 20 مليار دولار" },
    { id: 5, title: "بث الفيديو قبل أن يصبح رائجاً... انطفاء غداً" },
    { id: 6, title: "مع تراجع الين، اليابان المحبة للأجهزة تتجه لشراء آيفون مستعمل" },
    { id: 7, title: "إنتل تخسر محاولة إحياء دعوى احتكار ضد شركة Fortress" },
    { id: 8, title: "تفشي كوفيد يتفاقم مع اقتراب المزيد من الإغلاقات في الصين" },
    { id: 9, title: "عروض الجمعة السوداء المبكرة من أمازون: تلفزيونات وسماعات وأجهزة لابتوب بأسعار رخيصة" },
    { id: 10, title: "تقديم ماكس روشدن بمشاركة باري غليندينينغ وفيليب أوكلير" },
  ];

  return posts.map((post) => ({
    slug: post.id.toString(),
  }));
}
