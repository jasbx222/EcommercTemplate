import SocialMediaApp from "@/app/components/apps/social-media";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "روابط التواصل الاجتماعي",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "روابط التواصل الاجتماعي" },
];

const SocialMediaPage = () => {
  return (
    <>
      <BreadcrumbComp title="روابط التواصل الاجتماعي" items={BCrumb} />
      <SocialMediaApp />
    </>
  );
};

export default SocialMediaPage;
