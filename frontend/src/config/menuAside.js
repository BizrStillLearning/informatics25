import {
    LayoutDashboard,
    Users,
    UserCog,
    Calendar,
    Image as ImageIcon,
    BookOpen,
    GraduationCap,
    ClipboardList,
    UserCircle,
    BookImage,
    FolderOpen
} from 'lucide-vue-next';

export const menuAside = {
    admin: [
        {
            id: 'overview',
            name: 'Overview',
            icon: LayoutDashboard,
            path: '/dashboard/admin'
        },
        {
            id: 'students',
            name: 'Students',
            icon: Users,
            path: '/dashboard/admin/students'
        },
        {
            id: 'gallery',
            name: 'Gallery',
            icon: ImageIcon,
            path: '/dashboard/admin/gallery'
        },
        {
            id: 'schedules',
            name: 'Schedules',
            icon: Calendar,
            path: '/dashboard/admin/schedules'
        },
        {
            id: 'org',
            name: 'Organization',
            icon: UserCog,
            path: '/dashboard/admin/organization'
        },
        {
            id: 'library',
            name: 'E-Library',
            icon: BookOpen,
            path: '/dashboard/admin/library'
        },
        {
            id: 'vault',
            name: 'Vault Moderator',
            icon: FolderOpen,
            path: '/dashboard/admin/vault'
        },
    ],
    mahasiswa: [
        {
            id: 'st-dash',
            name: 'My Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard/student'
        },
        {
            id: 'st-schedule',
            name: 'Class Schedule',
            icon: Calendar,
            path: '/dashboard/student/schedule'
        },
        {
            id: 'st-library',
            name: 'Library',
            icon: BookOpen,
            path: '/dashboard/student/library'
        },
        {
            id: 'st-vault',
            name: 'Archive Hub',
            icon: FolderOpen,
            path: '/dashboard/student/vault'
        },
        {
            id: 'st-gallery',
            name: 'Gallery',
            icon: BookImage,
            path: '/dashboard/student/gallery'
        },
        {
            id: 'st-grades',
            name: 'Academic Record',
            icon: GraduationCap,
            path: '/dashboard/student/grades'
        },
        {
            id: 'st-tasks',
            name: 'Assignments',
            icon: ClipboardList,
            path: '/dashboard/student/assignments'
        },
    ]
};