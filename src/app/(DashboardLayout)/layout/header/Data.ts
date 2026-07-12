
import { IconUser, IconMail, IconListCheck, IconProps, Icon} from '@tabler/icons-react';

//  Profile Data
interface ProfileType {
  title: string;
  img: any;
  subtitle: string;
  url: string;
  icon:string
}


const profileDD: ProfileType[] = [
  {
    img: "matdash-nextjs/images/svgs/icon-account.svg",
    title: "الملف الشخصي",
    subtitle: "إعدادات الحساب",
    icon:"tabler:user",
    url: "/user-profile",
  },
  {
    img: "matdash-nextjs/images/svgs/icon-inbox.svg",
    title: "حسابي",
    subtitle: "ملاحظاتي اليومية",
    icon:"tabler:mail",
    url: "/",
  },
  {
    img: "matdash-nextjs/images/svgs/icon-tasks.svg",
    title: "مهامي",
    subtitle: "المهام والأعمال اليومية",
    icon:"tabler:list-check",
    url: "/",
  },
];

const Notifications = [
  {
    title: "انضم رومان إلى الفريق!",
    subtitle: "هنّئه على ذلك",
  },
  {
    title: "رسالة جديدة",
    subtitle: "أرسلت لك سلمى رسالة جديدة",
  },
  {
    title: "أرسلت بيانكا دفعة",
    subtitle: "تحقق من أرباحك",
  },
  {
    title: "أنهت جولي مهامها",
    subtitle: "أسند إليها مهام جديدة",
  },
  {
    title: "استلم جون دفعة",
    subtitle: "تم خصم 230$ من الحساب",
  },
];

export {
  Notifications,
  profileDD,
};
