import GeoDataApp from "@/app/components/apps/geo-data";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "البيانات الجغرافية",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "البيانات الجغرافية" },
];

const GeoDataPage = () => {
  return (
    <>
      <BreadcrumbComp title="البيانات الجغرافية" items={BCrumb} />
      <GeoDataApp />
    </>
  );
};

export default GeoDataPage;
