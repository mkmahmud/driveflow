export type SidebarLink = {
    id: string
    label: string
    href: string
    icon: string
    roles: string[]
    children?: SidebarLink[]
}

export const SIDEBAR_LINKS: SidebarLink[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        roles: ['ADMIN', 'USER', 'HOST']
    },
    {
        id: 'bookings',
        label: 'My Bookings',
        href: '/dashboard/bookings',
        icon: 'Calendar',
        roles: ['ADMIN', 'USER']
    },
    {
        id: 'my-cars',
        label: 'My Cars',
        href: '/dashboard/my-cars',
        icon: 'Car',
        roles: ['ADMIN', 'HOST']
    },
    {
        id: 'earnings',
        label: 'Earnings',
        href: '/dashboard/earnings',
        icon: 'DollarSign',
        roles: ['ADMIN', 'HOST']
    },
    {
        id: 'manage-cars',
        label: 'Manage Cars',
        href: '/dashboard/manage-cars',
        icon: 'Settings',
        roles: ['ADMIN'],
        children: [
            {
                id: 'all-cars',
                label: 'All Cars',
                href: '/dashboard/manage-cars',
                icon: 'List',
                roles: ['ADMIN']
            },
            {
                id: 'add-car',
                label: 'Add New Car',
                href: '/dashboard/manage-cars/add',
                icon: 'Plus',
                roles: ['ADMIN']
            },
            {
                id: 'categories',
                label: 'Categories',
                href: '/dashboard/manage-cars/categories',
                icon: 'Tag',
                roles: ['ADMIN']
            }
        ]
    },
    {
        id: 'users',
        label: 'User Management',
        href: '/dashboard/users',
        icon: 'Users',
        roles: ['ADMIN'],
        children: [
            {
                id: 'all-users',
                label: 'All Users',
                href: '/dashboard/users',
                icon: 'User',
                roles: ['ADMIN']
            },
            {
                id: 'hosts',
                label: 'Hosts',
                href: '/dashboard/users/hosts',
                icon: 'UserCheck',
                roles: ['ADMIN']
            }
        ]
    },
    {
        id: 'transactions',
        label: 'Transactions',
        href: '/dashboard/transactions',
        icon: 'CreditCard',
        roles: ['ADMIN']
    },
    {
        id: 'reports',
        label: 'Reports',
        href: '/dashboard/reports',
        icon: 'BarChart3',
        roles: ['ADMIN']
    },
    {
        id: 'settings',
        label: 'Settings',
        href: '/dashboard/settings',
        icon: 'Settings',
        roles: ['ADMIN', 'USER', 'HOST']
    }
]