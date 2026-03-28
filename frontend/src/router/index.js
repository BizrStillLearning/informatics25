import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../i18n'
import Home from '../views/Home.vue'
import LoginView from "../views/LoginView.vue";
import GalleriDetail from "../views/GalleriDetail.vue";
import Student from "../views/Student.vue";
import StudentDetail from "../views/StudentDetail.vue";
import Events from "../views/Events.vue";
import Admin from "../views/dashboard/Admin.vue";
import StudentDashboard from "../views/dashboard/Student.vue";

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
    {
        path: '/dashboard/admin',
        name: 'Admin',
        component: Admin,
        meta: { titleKey: 'nav.dashboard', requiresAuth: true, role: 'admin' }
    },
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
    { path: '/gallery/:slug', name: 'GalleryDetail', component: GalleriDetail, meta: { titleKey: 'nav.gallery', requiresAuth: false } },
    { path: '/students', name: 'Student', component: Student, meta: { titleKey: 'nav.students', requiresAuth: false } },
    { path: '/students/:slug', name: 'StudentDetail', component: StudentDetail, meta: { titleKey: 'nav.students', requiresAuth: false } },
    { path: '/events', name: 'Events', component: Events, meta: { titleKey: 'nav.event', requiresAuth: false } },
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
    const role = localStorage.getItem('role');

    if (to.meta.requiresAuth) {
        if (!token) {
            return next({ name: 'Login' });
        }
        if (to.meta.role && to.meta.role !== role) {
            const redirectPath = role === 'admin' ? '/dashboard/admin' : '/dashboard/student';
            return next(redirectPath);
        }

        next();
    }
    else {
        if (to.name === 'Login' && token) {
            const redirectPath = role === 'admin' ? '/dashboard/admin' : '/dashboard/student';
            return next(redirectPath);
        }
        next();
    }
});

router.afterEach((to) => {
    const translatedTitle = to.meta.titleKey ? i18n.global.t(to.meta.titleKey) : 'Informatics 25';
    document.title = `${translatedTitle} - Informatics 25`;
});

export default router