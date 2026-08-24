import AdsApp from "@/app/components/apps/ads";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإعلانات",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "الإعلانات" },
];

const AdsPage = () => {
  return (
    <>
      <BreadcrumbComp title="الإعلانات" items={BCrumb} />
      <AdsApp />
    </>
  );
};

export default AdsPage;
