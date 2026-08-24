import ColorsApp from "@/app/components/apps/colors";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الألوان",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "الألوان" },
];

const ColorsPage = () => {
  return (
    <>
      <BreadcrumbComp title="الألوان" items={BCrumb} />
      <ColorsApp />
    </>
  );
};

export default ColorsPage;
