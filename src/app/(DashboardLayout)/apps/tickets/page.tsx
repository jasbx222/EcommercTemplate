import TicketsApp from "@/app/components/apps/tickets";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "تطبيق التذاكر",
};

const BCrumb = [
  {
    to: "/",
    title: "الرئيسية",
  },
  {
    title: "التذاكر",
  },
];
const Tickets = () => {
  return (
    <>
      <BreadcrumbComp title="تطبيق التذاكر" items={BCrumb} />
      <TicketsApp />
    </>
  );
};

export default Tickets;
