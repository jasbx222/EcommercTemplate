import ReportsApp from "@/app/components/apps/reports";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "التقارير",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "التقارير" },
];

const ReportsPage = () => {
  return (
    <>
      <BreadcrumbComp title="التقارير" items={BCrumb} />
      <ReportsApp />
    </>
  );
};

export default ReportsPage;
