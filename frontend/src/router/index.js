import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../i18n'

import Home from '../views/Home.vue'
import LoginView from "../views/LoginView.vue";
import GalleriDetail from "../views/GalleriDetail.vue";
import Student from "../views/Student.vue";
import StudentDetail from "../views/StudentDetail.vue";
import Events from "../views/Events.vue";
import Index from "../views/dashboard/Admin/Index.vue";
import StudentDashboard from "../views/dashboard/Profile.vue";
import StudentsAdmin from "../views/dashboard/Admin/Student.vue";
import GalleryAdmin from "../views/dashboard/Admin/Gallery.vue";
import SchedulesAdmin from "../views/dashboard/Admin/Schedules.vue";
import OrganizationAdmin from "../views/dashboard/Admin/Organization.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { titleKey: 'nav.home', requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { titleKey: 'nav.admin', requiresAuth: false }
    },

    // --- DASHBOARD ADMIN (NESTED ROUTES) ---
    {
        path: '/dashboard/admin',
        component: Index,
        meta: { requiresAuth: true, role: 'admin' },
        children: [
            {
                path: '',
                name: 'Admin',
                meta: { titleKey: 'nav.dashboard', isOverview: true }
            },
            {
                path: 'students',
                name: 'StudentsAdmin',
                component: StudentsAdmin,
                meta: { titleKey: 'nav.students', isOverview: false }
            },
            {
                path: 'gallery',
                name: 'GalleryAdmin',
                component: GalleryAdmin,
                meta: { titleKey: 'nav.gallery', isOverview: false }
            },
            {
                path: 'schedules',
                name: 'SchedulesAdmin',
                component: SchedulesAdmin,
                meta: { titleKey: 'nav.schedules', isOverview: false }
            },
            {
                path: 'resources',
                name: 'ResourcesAdmin',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.resources', isOverview: false }
            },
            {
                path: 'organization', // Disinkronkan (Tunggal)
                name: 'OrganizationAdmin',
                component: OrganizationAdmin,
                meta: { titleKey: 'nav.organization', isOverview: false }
            },
        ]
    },

    // --- DASHBOARD STUDENT ---
    {
        path: '/dashboard/student',
        name: 'StudentDashboard',
        component: StudentDashboard,
        meta: {
            titleKey: 'nav.dashboard',
            requiresAuth: true,
            role: 'mahasiswa'
        }
    },

    // --- PUBLIC PAGES ---
    { path: '/gallery/:slug', name: 'GalleryDetail', component: GalleriDetail, meta: { titleKey: 'nav.gallery' } },
    { path: '/students', name: 'Student', component: Student, meta: { titleKey: 'nav.students' } },
    { path: '/students/:slug', name: 'StudentDetail', component: StudentDetail, meta: { titleKey: 'nav.students' } },
    { path: '/events', name: 'Events', component: Events, meta: { titleKey: 'nav.event' } },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.toLowerCase();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) return next({ name: 'Login' });

        const requiredRole = to.matched.find(record => record.meta.role)?.meta.role;
        if (requiredRole && requiredRole !== role) {
            return next(role === 'admin' ? '/dashboard/admin' : '/dashboard/student');
        }
        next();
    } else if (to.name === 'Login' && token) {
        next(role === 'admin' ? '/dashboard/admin' : '/dashboard/student');
    } else {
        next();
    }
});

router.afterEach((to) => {
    const titleKey = to.meta.titleKey || to.matched.find(r => r.meta.titleKey)?.meta.titleKey;
    const translatedTitle = titleKey ? i18n.global.t(titleKey) : 'Informatics 25';
    document.title = `${translatedTitle} - Informatics 25`;
});

export default router