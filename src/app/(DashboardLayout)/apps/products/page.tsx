import ProductsApp from "@/app/components/apps/products";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المنتجات",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "المنتجات" },
];

const ProductsPage = () => {
  return (
    <>
      <BreadcrumbComp title="المنتجات" items={BCrumb} />
      <ProductsApp />
    </>
  );
};

export default ProductsPage;
