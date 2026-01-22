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
        href: '/dashboard/user/bookings',
        icon: 'Calendar',
        roles: ['USER']
    },
    {
        id: 'payments',
        label: 'Payments',
        href: '/dashboard/user/payments',
        icon: 'CreditCard',
        roles: ['USER']
    },
    {
        id: 'my-cars',
        label: 'My Cars',
        href: '/dashboard/host/mycars',
        icon: 'Car',
        roles: ['HOST']
    },
    {
        id: 'add-new-car',
        label: 'Add New Car',
        href: '/dashboard/host/add-new-car',
        icon: 'Plus',
        roles: ['HOST']
    },
    {
        id: 'earnings',
        label: 'Earnings',
        href: '/dashboard/host/earnings',
        icon: 'DollarSign',
        roles: ['HOST']
    },
    {
        id: 'bookings',
        label: 'All Bookings',
        href: '/dashboard/admin/bookings',
        icon: 'Calendar',
        roles: ['ADMIN']
    },
    {
        id: 'manage-cars',
        label: 'Manage Cars',
        href: '/dashboard/admin/manage-cars',
        icon: 'Settings',
        roles: ['ADMIN'],
        children: [
            {
                id: 'all-cars',
                label: 'All Cars',
                href: '/dashboard/admin/manage-cars/all-cars',
                icon: 'List',
                roles: ['ADMIN']
            },
            {
                id: 'add-car',
                label: 'Add New Car',
                href: '/dashboard/admin/manage-cars/add-new-car',
                icon: 'Plus',
                roles: ['ADMIN']
            },
            {
                id: 'categories',
                label: 'Categories',
                href: '/dashboard/admin/manage-cars/categories',
                icon: 'Tag',
                roles: ['ADMIN']
            }
        ]
    },
    {
        id: 'users',
        label: 'User Management',
        href: '/dashboard/admin/users-management',
        icon: 'Users',
        roles: ['ADMIN'],
        children: [
            {
                id: 'all-users',
                label: 'All Users',
                href: '/dashboard/admin/users-management/all-users',
                icon: 'User',
                roles: ['ADMIN']
            },
            {
                id: 'hosts',
                label: 'Hosts',
                href: '/dashboard/admin/users-management/hosts',
                icon: 'UserCheck',
                roles: ['ADMIN']
            }
        ]
    },
    {
        id: 'transactions',
        label: 'Transactions',
        href: '/dashboard/admin/transactions',
        icon: 'CreditCard',
        roles: ['ADMIN']
    },
    {
        id: 'reports',
        label: 'Reports',
        href: '/dashboard/admin/reports',
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