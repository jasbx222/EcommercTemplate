
import NotesApp from "@/app/components/apps/notes";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "تطبيق الملاحظات",
};

const BCrumb = [
  {
    to: "/",
    title: "الرئيسية",
  },
  {
    title: "الملاحظات",
  },
];
const Notes = () => {

  return (
    <>

        <BreadcrumbComp title="تطبيق الملاحظات" items={BCrumb} />
        <NotesApp/>
    </>
  );
};

export default Notes;
