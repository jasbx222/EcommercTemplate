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
    heading: 'الرئيسية',
    children: [
      {
        name: 'لوحة المعلومات',
        icon: 'solar:widget-add-line-duotone',
        id: uniqueId(),
        url: '/',
        isPro: false,
      },
    ],
  },
  {
    heading: 'المتجر',
    children: [
      {
        name: 'المنتجات',
        icon: 'solar:box-line-duotone',
        id: uniqueId(),
        url: '/apps/products',
        isPro: false,
      },
      {
        name: 'الفئات',
        icon: 'solar:folder-line-duotone',
        id: uniqueId(),
        url: '/apps/categories',
        isPro: false,
      },
      {
        name: 'الألوان',
        icon: 'solar:pallete-2-line-duotone',
        id: uniqueId(),
        url: '/apps/colors',
        isPro: false,
      },
      {
        name: 'الإعلانات',
        icon: 'solar:megaphone-line-duotone',
        id: uniqueId(),
        url: '/apps/ads',
        isPro: false,
      },
    ],
  },
  {
    heading: 'المبيعات',
    children: [
      {
        name: 'الطلبات',
        icon: 'solar:cart-large-line-duotone',
        id: uniqueId(),
        url: '/apps/orders',
        isPro: false,
      },
      {
        name: 'العملاء',
        icon: 'solar:users-group-rounded-line-duotone',
        id: uniqueId(),
        url: '/apps/clients',
        isPro: false,
      },
      {
        name: 'التقارير',
        icon: 'solar:chart-line-duotone',
        id: uniqueId(),
        url: '/apps/reports',
        isPro: false,
      },
    ],
  },
  {
    heading: 'الفريق والتوصيل',
    children: [
      {
        name: 'الموظفون',
        icon: 'solar:user-id-line-duotone',
        id: uniqueId(),
        url: '/apps/employees',
        isPro: false,
      },
      {
        name: 'المندوبون',
        icon: 'solar:scooter-line-duotone',
        id: uniqueId(),
        url: '/apps/couriers',
        isPro: false,
      },
      {
        name: 'البيانات الجغرافية',
        icon: 'solar:map-point-line-duotone',
        id: uniqueId(),
        url: '/apps/geo-data',
        isPro: false,
      },
    ],
  },
  {
    heading: 'الإعدادات',
    children: [
      {
        name: 'روابط التواصل الاجتماعي',
        icon: 'solar:share-line-duotone',
        id: uniqueId(),
        url: '/apps/social-media',
        isPro: false,
      },
      {
        name: 'الإعدادات العامة',
        icon: 'solar:settings-line-duotone',
        id: uniqueId(),
        url: '/apps/settings',
        isPro: false,
      },
    ],
  },
]

export default SidebarContent
