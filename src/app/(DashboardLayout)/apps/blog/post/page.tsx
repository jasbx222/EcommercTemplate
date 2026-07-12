
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import BlogPost from "@/app/components/apps/blog/BlogPost";
import { Metadata } from "next";
const BCrumb = [
  {
    to: "/",
    title: "الرئيسية",
  },
  {
    title: "تطبيق المدونة",
  },
];
export const metadata: Metadata = {
  title: "المدونة",
};
const Blog = () => {
  return (
    <>
     <BreadcrumbComp title="تطبيق المدونة" items={BCrumb} />
     <BlogPost/>
    </>
  );
};
export default Blog;
