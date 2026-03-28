import {
    LayoutDashboard, Users, UserCog, Calendar,
    Image as ImageIcon, BookOpen, GraduationCap,
    FileText, ClipboardList
} from 'lucide-vue-next';

export const menuAside = {
    admin: [
        { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/admin', id: 'overview' },
        { name: 'Students', icon: Users, path: '/dashboard/admin/students', id: 'students' },
        { name: 'Organization', icon: UserCog, path: '/dashboard/admin/organization', id: 'org' },
        { name: 'Schedules', icon: Calendar, path: '/dashboard/admin/schedules', id: 'schedules' },
        { name: 'Gallery', icon: ImageIcon, path: '/dashboard/admin/events', id: 'events' },
        { name: 'Library', icon: BookOpen, path: '/dashboard/admin/resources', id: 'resources' },
    ],
    mahasiswa: [
        { name: 'My Dashboard', icon: LayoutDashboard, path: '/dashboard/student', id: 'st-dash' },
        { name: 'Class Schedule', icon: Calendar, path: '/dashboard/student/schedule', id: 'st-schedule' },
        { name: 'Academic Record', icon: GraduationCap, path: '/dashboard/student/grades', id: 'st-grades' },
        { name: 'Resources', icon: BookOpen, path: '/dashboard/student/resources', id: 'st-resources' },
        { name: 'Assignments', icon: ClipboardList, path: '/dashboard/student/tasks', id: 'st-tasks' },
    ]
};