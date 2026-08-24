import ClientsApp from "@/app/components/apps/clients";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "العملاء",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "العملاء" },
];

const ClientsPage = () => {
  return (
    <>
      <BreadcrumbComp title="العملاء" items={BCrumb} />
      <ClientsApp />
    </>
  );
};

export default ClientsPage;
