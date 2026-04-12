import {
    LayoutDashboard,
    Users,
    UserCog,
    Calendar,
    Image as ImageIcon,
    BookOpen,
    GraduationCap,
    ClipboardList
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
            path: '/dashboard/admin/schedules' // Sudah sinkron dengan router
        },
        {
            id: 'resources',
            name: 'Library',
            icon: BookOpen,
            path: '/dashboard/admin/resources'
        },
        {
            id: 'org',
            name: 'Organization',
            icon: UserCog,
            path: '/dashboard/admin/organization'
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
            id: 'st-grades',
            name: 'Academic Record',
            icon: GraduationCap,
            path: '/dashboard/student' // Sementara diarahkan ke home karena rute belum ada
        },
        {
            id: 'st-resources',
            name: 'Resources',
            icon: BookOpen,
            path: '/dashboard/student' // Sementara diarahkan ke home karena rute belum ada
        },
        {
            id: 'st-tasks',
            name: 'Assignments',
            icon: ClipboardList,
            path: '/dashboard/student' // Sementara diarahkan ke home karena rute belum ada
        },
    ]
};