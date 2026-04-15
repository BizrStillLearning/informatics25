import {
    LayoutDashboard,
    Users,
    UserCog,
    Calendar,
    Image as ImageIcon,
    BookOpen,
    GraduationCap,
<<<<<<< HEAD
    ClipboardList,
    UserCircle,
    BookImage,
    FolderOpen
=======
    ClipboardList
>>>>>>> 5b3066eb8c5e15d2768ef54d82b9c56e9676498c
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
<<<<<<< HEAD
            path: '/dashboard/admin/schedules'
=======
            path: '/dashboard/admin/schedules' // Sudah sinkron dengan router
        },
        {
            id: 'resources',
            name: 'Library',
            icon: BookOpen,
            path: '/dashboard/admin/resources'
>>>>>>> 5b3066eb8c5e15d2768ef54d82b9c56e9676498c
        },
        {
            id: 'org',
            name: 'Organization',
            icon: UserCog,
            path: '/dashboard/admin/organization'
        },
<<<<<<< HEAD
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
=======
>>>>>>> 5b3066eb8c5e15d2768ef54d82b9c56e9676498c
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5b3066eb8c5e15d2768ef54d82b9c56e9676498c
        },
        {
            id: 'st-tasks',
            name: 'Assignments',
            icon: ClipboardList,
<<<<<<< HEAD
            path: '/dashboard/student/assignments'
=======
            path: '/dashboard/student' // Sementara diarahkan ke home karena rute belum ada
>>>>>>> 5b3066eb8c5e15d2768ef54d82b9c56e9676498c
        },
    ]
};