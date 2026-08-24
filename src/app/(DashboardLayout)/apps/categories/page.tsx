import CategoriesApp from "@/app/components/apps/categories";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفئات",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "الفئات" },
];

const CategoriesPage = () => {
  return (
    <>
      <BreadcrumbComp title="الفئات" items={BCrumb} />
      <CategoriesApp />
    </>
  );
};

export default CategoriesPage;
