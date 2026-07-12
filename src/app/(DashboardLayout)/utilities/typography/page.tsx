import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";

const page = () => {

  const BCrumb = [
    {
      to: "/",
      title: "الرئيسية",
    },
    {
      title: "الطباعة",
    },
  ];
  return (
    <>
      <BreadcrumbComp title="الطباعة" items={BCrumb} />
      <div className="rounded-xl bg-background p-6 relative w-full shadow-xs">
        <div className="flex flex-col gap-6">
          <div className="border border-ld rounded-3xl px-6 py-4">
            <h1 className="font-semibold text-4xl">h1.عنوان</h1>
            <p className="mt-2">حجم الخط: 36 | تباعد الأسطر: 40 | وزن الخط: 600</p>
          </div>
          <div className="border border-ld rounded-3xl px-6 py-4">
            <h2 className="font-semibold text-3xl">h2.عنوان</h2>
            <p className="mt-2">حجم الخط: 30 | تباعد الأسطر: 36 | وزن الخط: 600</p>
          </div>
          <div className="border border-ld rounded-3xl px-6 py-4">
            <h3 className="font-semibold text-2xl">h3.عنوان</h3>
            <p className="mt-2">حجم الخط: 24 | تباعد الأسطر: 32 | وزن الخط: 600</p>
          </div>
          <div className="border border-ld rounded-3xl px-6 py-4">
            <h4 className="font-semibold text-xl">h4.عنوان</h4>
            <p className="mt-2">حجم الخط: 20 | تباعد الأسطر: 28 | وزن الخط: 600</p>
          </div>
          <div className="border border-ld rounded-3xl px-6 py-4">
            <h5 className="font-semibold text-lg">h5.عنوان</h5>
            <p className="mt-2">حجم الخط: 20 | تباعد الأسطر: 28 | وزن الخط: 600</p>
          </div>
          <div className="border border-ld rounded-3xl px-6 py-4">
            <h6 className="font-semibold text-base">h6.عنوان</h6>
            <p className="mt-2">حجم الخط: 16 | تباعد الأسطر: 24 | وزن الخط: 600</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
