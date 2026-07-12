import { TicketType } from "../(DashboardLayout)/types/ticket";

export const TicketData: TicketType[] = [
  {
    Id: 1,
    ticketTitle: 'تعذر تسجيل الدخول إلى لوحة التحكم',
    ticketDescription:
      'يواجه المستخدم رسالة خطأ عند محاولة تسجيل الدخول، ويُرجى من فريق الدعم مراجعة الحساب والتحقق من صلاحيات الوصول في أقرب وقت ممكن.',
    Status: 'Closed',
    Label: 'error',
    thumb: "/matdash-nextjs/images/profile/user-10.jpg",
    AgentName: 'عمر',
    Date: new Date("2023-12-01"),
    deleted: false,
  },
  {
    Id: 2,
    ticketTitle: 'طلب استرجاع بيانات محذوفة عن طريق الخطأ',
    ticketDescription:
      'تم حذف بعض الملفات عن طريق الخطأ من لوحة التحكم، ونحتاج إلى استعادتها من النسخة الاحتياطية الأخيرة في أسرع وقت.',
    Status: 'Pending',
    Label: 'warning',
    thumb: "/matdash-nextjs/images/profile/user-2.jpg",
    AgentName: 'سالم',
    Date: new Date("2023-12-02"),
    deleted: false,
  },
  {
    Id: 3,
    ticketTitle: 'مشكلة في تحميل الصفحة الرئيسية',
    ticketDescription:
      'الصفحة الرئيسية للموقع تستغرق وقتاً طويلاً في التحميل أو تظهر فارغة أحياناً، يُرجى التحقق من الخادم وإصلاح المشكلة.',
    Status: 'Open',
    Label: 'success',
    thumb: "/matdash-nextjs/images/profile/user-3.jpg",
    AgentName: 'جابر',
    Date: new Date("2023-12-03"),
    deleted: false,
  },
  {
    Id: 4,
    ticketTitle: 'تعذر تسجيل الدخول إلى لوحة التحكم',
    ticketDescription:
      'يواجه المستخدم رسالة خطأ عند محاولة تسجيل الدخول، ويُرجى من فريق الدعم مراجعة الحساب والتحقق من صلاحيات الوصول في أقرب وقت ممكن.',
    Status: 'Closed',
    Label: 'error',
    thumb: "/matdash-nextjs/images/profile/user-4.jpg",
    AgentName: 'سالم',
    Date: new Date("2023-12-04"),
    deleted: false,
  },
  {
    Id: 5,
    ticketTitle: 'مشكلة في تحميل الصفحة الرئيسية',
    ticketDescription:
      'الصفحة الرئيسية للموقع تستغرق وقتاً طويلاً في التحميل أو تظهر فارغة أحياناً، يُرجى التحقق من الخادم وإصلاح المشكلة.',
    Status: 'Closed',
    Label: 'error',
    thumb: "/matdash-nextjs/images/profile/user-5.jpg",
    AgentName: 'عمر',
    Date: new Date("2023-12-05"),
    deleted: false,
  },
  {
    Id: 6,
    ticketTitle: 'طلب استرجاع بيانات محذوفة عن طريق الخطأ',
    ticketDescription:
      'تم حذف بعض الملفات عن طريق الخطأ من لوحة التحكم، ونحتاج إلى استعادتها من النسخة الاحتياطية الأخيرة في أسرع وقت.',
    Status: 'Pending',
    Label: 'warning',
    thumb: "/matdash-nextjs/images/profile/user-6.jpg",
    AgentName: 'جابر',
    Date: new Date("2023-12-06"),
    deleted: false,
  },
  {
    Id: 7,
    ticketTitle: 'تعذر تسجيل الدخول إلى لوحة التحكم',
    ticketDescription:
      'يواجه المستخدم رسالة خطأ عند محاولة تسجيل الدخول، ويُرجى من فريق الدعم مراجعة الحساب والتحقق من صلاحيات الوصول في أقرب وقت ممكن.',
    Status: 'Open',
    Label: 'success',
    thumb: "/matdash-nextjs/images/profile/user-7.jpg",
    AgentName: 'سالم',
    Date: new Date("2023-12-07"),
    deleted: false,
  },
  {
    Id: 8,
    ticketTitle: 'طلب استرجاع بيانات محذوفة عن طريق الخطأ',
    ticketDescription:
      'تم حذف بعض الملفات عن طريق الخطأ من لوحة التحكم، ونحتاج إلى استعادتها من النسخة الاحتياطية الأخيرة في أسرع وقت.',
    Status: 'Closed',
    Label: 'error',
    thumb: "/matdash-nextjs/images/profile/user-8.jpg",
    AgentName: 'يوسف',
    Date: new Date("2023-12-08"),
    deleted: false,
  },
];
