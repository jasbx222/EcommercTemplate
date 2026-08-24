import EmployeesApp from "@/app/components/apps/employees";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الموظفون",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "الموظفون" },
];

const EmployeesPage = () => {
  return (
    <>
      <BreadcrumbComp title="الموظفون" items={BCrumb} />
      <EmployeesApp />
    </>
  );
};

export default EmployeesPage;
