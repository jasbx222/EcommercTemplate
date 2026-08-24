import CouriersApp from "@/app/components/apps/couriers";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المندوبون",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "المندوبون" },
];

const CouriersPage = () => {
  return (
    <>
      <BreadcrumbComp title="المندوبون" items={BCrumb} />
      <CouriersApp />
    </>
  );
};

export default CouriersPage;
