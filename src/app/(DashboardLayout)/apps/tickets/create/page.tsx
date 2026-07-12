import CreateTicketForm from "@/app/components/apps/tickets/CreateTicketForm";
import type { Metadata } from "next";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";


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
const CreateTickets = () => {
    return (
        <>
            <BreadcrumbComp title="تطبيق التذاكر" items={BCrumb} />
            <CreateTicketForm />

        </>
    );
};

export default CreateTickets;