import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'لوحات المعلومات',
    children: [
      {
        name: "لوحة المعلومات",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
        isPro: false
      },
      {
        name: "لوحة المعلومات 1",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "لوحة المعلومات 2",
        icon: "solar:chart-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "لوحة المعلومات 3",
        icon: "solar:screencast-2-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: 'الصفحات الأمامية',
        id: uniqueId(),
        icon: 'solar:home-angle-linear',
        url: '#',
        children: [
          {
            name: "الصفحة الرئيسية",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "من نحن",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "المدونة",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "تفاصيل المدونة",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "اتصل بنا",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "معرض الأعمال",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الأسعار",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
        ],
      },
    ],
  },
  {
    heading: 'الذكاء الاصطناعي',
    children: [
      {
        name: 'منشئ الجداول بالذكاء الاصطناعي',
        icon: 'solar:server-linear',
        id: uniqueId(),
        url: '#!',
        isPro: false,

      },
      {
        name: 'منشئ النماذج بالذكاء الاصطناعي',
        icon: 'solar:document-add-linear',
        id: uniqueId(),
        url: '#!',
        isPro: false,

      },
      {
        id: uniqueId(),
        name: 'منشئ الرسوم البيانية بالذكاء الاصطناعي',
        icon: 'solar:pie-chart-2-linear',
        url: '#!',
        isPro: false,

      },
    ],
  },
  {
    heading: 'الأدوات المساعدة',
    children: [
      {
        name: 'الطباعة',
        icon: 'solar:text-circle-outline',
        id: uniqueId(),
        url: '/utilities/typography',
      },
      {
        name: 'الجدول',
        icon: 'solar:server-linear',
        id: uniqueId(),
        url: '/utilities/table',
      },
      {
        name: 'النموذج',
        icon: 'solar:document-add-linear',
        id: uniqueId(),
        url: '/utilities/form',
      },
      {
        name: "الظل",
        icon: "solar:airbuds-case-charge-outline",
        id: uniqueId(),
        url: "/utilities/shadow",
      },
      {
        id: uniqueId(),
        name: 'الملف الشخصي للمستخدم',
        icon: 'solar:user-circle-linear',
        url: '/user-profile',
        isPro: false,
      },
    ],
  },
  {
    heading: 'التطبيقات',
    children: [
      {
        id: uniqueId(),
        name: 'الملاحظات',
        icon: 'solar:notes-linear',
        url: '/apps/notes',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'التذاكر',
        icon: 'solar:ticker-star-linear',
        url: '/apps/tickets',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'جهات الاتصال',
        icon: "solar:phone-line-duotone",
        url: '#!',
        isPro: true,
      },
      {
        name: "التجارة الإلكترونية",
        id: uniqueId(),
        icon: "solar:cart-3-line-duotone",
        children: [
          {
            id: uniqueId(),
            name: "المتجر",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التفاصيل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "القائمة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الدفع",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "إضافة منتج",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "تعديل منتج",
            url:"#!",
            isPro: true
          },
        ],
      },
      {
        name: "المدونات",
        id: uniqueId(),
        icon: "solar:widget-add-line-duotone",
        children: [
          {
            id: uniqueId(),
            name: "مقالة المدونة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "تفاصيل المدونة",
            url:"#!",
            isPro: true
          },
        ],
      },
      {
        name: "الملف الشخصي للمستخدم",
        id: uniqueId(),
        icon: "solar:shield-user-outline",
        children: [
          {
            id: uniqueId(),
            name: "الملف الشخصي",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "المتابعون",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الأصدقاء",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "معرض الصور",
            url:"#!",
            isPro: true
          },
        ],
      },

      {
        name: "الفاتورة",
        id: uniqueId(),
        icon: "solar:bill-check-outline",
        children: [
          {
            id: uniqueId(),
            name: "القائمة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التفاصيل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "إنشاء",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "تعديل",
            url:"#!",
            isPro: true
          },
        ],
      },
      {
        id: uniqueId(),
        name: "المحادثات",
        icon: "solar:chat-round-line-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "التقويم",
        icon: "solar:calendar-mark-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "البريد الإلكتروني",
        icon: "solar:letter-linear",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "كانبان",
        icon: "solar:notebook-linear",
        url:"#!",
        isPro: true
      },
    ],
  },

  {
    heading: "الصفحات",
    children: [
      {
        name: "الصفحات",
        id: uniqueId(),
        icon: "solar:cloud-file-linear",
        children: [
          {
            name: "إعدادات الحساب",
            icon: "solar:settings-minimalistic-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الأسئلة الشائعة",
            icon: "solar:question-circle-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الأسعار",
            icon: "solar:dollar-minimalistic-linear",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الصفحة المقصودة",
            icon: "solar:bill-list-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الوصول حسب الدور",
            icon: "solar:accessibility-broken",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
        ]
      },
    ],
  },


  {
    isPro: true,
    heading: "الودجات",
    children: [
      {
        id: uniqueId(),
        name: "البطاقات",
        icon: "solar:cardholder-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "اللافتات",
        icon: "solar:align-vertical-spacing-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "الرسوم البيانية",
        icon: "solar:chart-square-line-duotone",
        url:"#!",
        isPro: true
      },
    ],
  },

  {
    isPro: true,
    heading: "واجهة المستخدم",
    children: [
      {
        name: "عناصر الواجهة",
        id: uniqueId(),
        icon: "solar:widget-6-outline",
        children: [
          {
            id: uniqueId(),
            name: "الأكورديون",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الشارة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الزر",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "القوائم المنسدلة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "النوافذ المنبثقة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التبويب",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "تلميح الأداة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التنبيه",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "شريط التقدم",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "ترقيم الصفحات",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مسار التنقل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الدرج الجانبي",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "القوائم",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الكاروسيل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مؤشر التحميل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الصورة الرمزية",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "اللافتة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مجموعة الأزرار",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "البطاقة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "منتقي التاريخ",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التذييل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "KBD",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "القائمة الضخمة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "شريط التنقل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الإطار المنبثق",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التقييم",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الشريط الجانبي",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الجداول",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الخط الزمني",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "إشعار سريع",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الطباعة",
            url:"#!",
            isPro: true
          },
        ],
      },
    ],
  },
  {
    isPro: true,
    heading: "Headless UI",
    children: [
      {
        name: "عناصر الواجهة",
        id: uniqueId(),
        icon: "solar:text-underline-cross-broken",
        children: [
          {
            name: "القائمة المنسدلة",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الإفصاح",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الحوار",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الإطار المنبثق",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "علامات التبويب",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الانتقال",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
        ],
      },
      {
        name: "عناصر النموذج",
        id: uniqueId(),
        icon: "solar:align-vertical-spacing-line-duotone",
        children: [
          {
            id: uniqueId(),
            name: "الأزرار",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "خانة الاختيار",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مربع الاختيار المدمج",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مجموعة الحقول",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "حقل الإدخال",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "صندوق القائمة",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مجموعة الأزرار الدائرية",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "قائمة الاختيار",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مفتاح التبديل",
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "منطقة النص",
            url:"#!",
            isPro: true
          },
        ],
      },
    ],
  },

  {
    isPro: true,
    heading: "الجداول",
    children: [
      {
        name: "الجداول الأساسية",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "جدول الصفوف المخططة",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "جدول التحويم",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "جدول خانات الاختيار",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
    ],
  },

  {
    isPro: true,
    heading: "جداول React",

    children: [
      {
        name: "جداول React",
        id: uniqueId(),
        icon: "solar:round-transfer-vertical-broken",
        children: [
          {
            id: uniqueId(),
            name: "أساسي",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "مضغوط",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "الفرز",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التصفية",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "ترقيم الصفحات",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "تحديد الصفوف",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "إظهار الأعمدة",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "قابل للتحرير",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "ثابت",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "السحب والإفلات",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "فارغ",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
          {
            id: uniqueId(),
            name: "التوسيع",
            icon: 'solar:round-transfer-vertical-broken',
            url:"#!",
            isPro: true
          },
        ]
      },
    ],
  },

  {
    isPro: true,
    heading: "الرسوم البيانية",
    children: [
      {
        name: "الرسم البياني الخطي",
        icon: "solar:chart-square-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "الرسم البياني المساحي",
        icon: "solar:graph-new-broken",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "الرسم البياني المتدرج",
        icon: "solar:round-graph-outline",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "الشموع اليابانية",
        icon: "solar:chandelier-outline",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "الأعمدة",
        icon: "solar:chart-2-bold-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "الدائري والحلقي",
        icon: "solar:pie-chart-2-linear",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
      {
        name: "الشعاعي والرادار",
        icon: "solar:graph-line-duotone",
        id: uniqueId(),
        url:"#!",
        isPro: true
      },
    ],
  },

  {
    isPro: true,
    heading: "النماذج",
    children: [
      {
        id: uniqueId(),
        name: "عناصر النماذج",
        icon: "solar:text-selection-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "تخطيطات النماذج",
        icon: "solar:document-text-outline",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "نماذج أفقية",
        icon: "solar:slider-horizontal-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "نماذج عمودية",
        icon: "solar:slider-vertical-line-duotone",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "نماذج مخصصة",
        icon: "solar:document-text-outline",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "التحقق من صحة النموذج",
        icon: "solar:bill-check-linear",
        url:"#!",
        isPro: true
      },
    ],
  },
  {
    isPro: true,
    heading: "المصادقة",
    children: [
      {
        name: "تسجيل الدخول",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: "/auth/login",
        isPro: false
      },
      {
        name: "إنشاء حساب",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: "/auth/register",
        isPro: false
      },
      {
        name: "صفحات المصادقة",
        id: uniqueId(),
        icon: "solar:user-plus-rounded-line-duotone",
        children: [
          {
            name: "خطأ",
            icon: "solar:bug-minimalistic-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "تسجيل دخول جانبي",
            icon: "solar:login-3-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "تسجيل دخول بإطار",
            icon: "solar:login-3-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "إنشاء حساب جانبي",
            icon: "solar:user-plus-rounded-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "إنشاء حساب بإطار",
            icon: "solar:user-plus-rounded-line-duotone",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "نسيت كلمة المرور - جانبي",
            icon: "solar:password-outline",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "نسيت كلمة المرور - بإطار",
            icon: "solar:password-outline",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "التحقق بخطوتين - جانبي",
            icon: "solar:password-outline",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "التحقق بخطوتين - بإطار",
            icon: "solar:password-outline",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
          {
            name: "الصيانة",
            icon: "solar:settings-outline",
            id: uniqueId(),
            url:"#!",
            isPro: true
          },
        ]
      },
    ],
  },
  {
    isPro: true,
    heading: "الأيقونات",
    children: [
      {
        id: uniqueId(),
        name: "أيقونات Solar",
        icon: "solar:sticker-smile-circle-outline",
        url:"#!",
        isPro: true
      },
      {
        id: uniqueId(),
        name: "أيقونات Tabler",
        icon: "solar:sticker-smile-circle-outline",
        url:"#!",
        isPro: true
      },
    ],
  },
  {
    isPro: true,
    heading: "إضافي",
    children: [
      {
        name: "الأيقونات",
        icon: "solar:smile-circle-outline",
        id: uniqueId(),
        url: "/icons/solar",
        isPro: false
      },
      {
        name: "صفحة نموذجية",
        icon: "solar:notes-minimalistic-outline",
        id: uniqueId(),
        url: "/sample-page",
        isPro: false
      },
    ],
  },
]

export default SidebarContent
