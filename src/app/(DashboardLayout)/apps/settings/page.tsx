import SettingsApp from "@/app/components/apps/settings";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإعدادات",
};

const BCrumb = [
  { to: "/", title: "الرئيسية" },
  { title: "الإعدادات" },
];

const SettingsPage = () => {
  return (
    <>
      <BreadcrumbComp title="الإعدادات" items={BCrumb} />
      <SettingsApp />
    </>
  );
};

export default SettingsPage;
