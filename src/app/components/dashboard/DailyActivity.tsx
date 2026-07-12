"use client";
import React from "react";
import Link from "next/link";
const DailyActivity = () => {

  const ActivitySteps = [
    {
      Time: "09:46",
      action: "تم استلام دفعة من جون دو بقيمة $385.90",
      color: "bg-primary",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "تم تسجيل عملية بيع جديدة",
      id: "#ML-3467",
      color: "bg-warning",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "تم دفع مبلغ $64.95 إلى مايكل",
      color: "bg-warning",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "تم تسجيل عملية بيع جديدة",
      id: "#ML-3467",
      color: "bg-secondary",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "اجتماع مشروع",
      color: "bg-error",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "تم استلام دفعة من جون دو بقيمة $385.90",
      color: "bg-primary"
    },
  ];
  return (
    <>
      <div className="rounded-xl h-full shadow-xs bg-white dark:bg-darkgray p-6 relative w-full words-break">
        <h5 className="card-title mb-10">الأنشطة اليومية</h5>

        <div className="flex flex-col mt-2">
          <ul>
            {ActivitySteps.map((item, index) => (
              <li key={index}>
                <div className="flex gap-4 min-h-16">
                  <div className="">
                    <p>{item.Time}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`rounded-full ${item.color} p-1.5 w-fit`}></div>
                    <div className={`${item.line}`}></div>
                  </div>
                  <div className="">
                    <p className="text-dark dark:text-white text-start">{item.action}</p>
                    <Link href="#" className="text-blue-700">
                      {item.id}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DailyActivity;
