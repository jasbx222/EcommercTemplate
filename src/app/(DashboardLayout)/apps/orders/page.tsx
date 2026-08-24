import OrdersApp from "@/app/components/apps/orders";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الطلبات",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "الطلبات" },
];

const OrdersPage = () => {
  return (
    <>
      <BreadcrumbComp title="الطلبات" items={BCrumb} />
      <OrdersApp />
    </>
  );
};

export default OrdersPage;
