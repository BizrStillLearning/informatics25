import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../i18n'

import Home from '../views/Home.vue'
import LoginView from "../views/LoginView.vue"
import GalleriDetail from "../views/GalleriDetail.vue"
import Student from "../views/Student.vue"
import StudentDetail from "../views/StudentDetail.vue"
import Events from "../views/Events.vue"
import IndexAdmin from "../views/dashboard/Admin/Index.vue"
import StudentsAdmin from "../views/dashboard/Admin/Student.vue"
import OrganizationAdmin from "../views/dashboard/Admin/Organization.vue"

import IndexStudent from "../views/dashboard/Student/Index.vue"

import SharedGallery from "../views/dashboard/Admin/Gallery.vue"
import SharedSchedules from "../views/shared/Schedules.vue"
import SharedProfile from "../views/dashboard/Admin/Profile.vue"
import SharedLibrary from "../views/shared/Library.vue"
import SharedVault from "../views/shared/Vault.vue"

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
        component: IndexAdmin,
        meta: { requiresAuth: true, role: 'admin' },
        children: [
            {
                path: '',
                name: 'AdminOverview',
                meta: { titleKey: 'nav.dashboard', isOverview: true }
            },
            {
                path: 'students',
                name: 'AdminStudents',
                component: StudentsAdmin,
                meta: { titleKey: 'nav.students', isOverview: false }
            },
            {
                path: 'gallery',
                name: 'AdminGallery',
                component: SharedGallery,
                meta: { titleKey: 'nav.gallery', isOverview: false }
            },
            {
                path: 'schedules',
                name: 'AdminSchedules',
                component: SharedSchedules,
                meta: { titleKey: 'nav.schedules', isOverview: false }
            },
            {
                path: 'organization',
                name: 'AdminOrganization',
                component: OrganizationAdmin,
                meta: { titleKey: 'nav.organization', isOverview: false }
            },
            {
                path: 'profile',
                name: 'AdminProfile',
                component: SharedProfile,
                meta: { titleKey: 'nav.profile', isOverview: false }
            },
            {
                path: 'library',
                name: 'AdminLibrary',
                component: SharedLibrary,
                meta: { titleKey: 'nav.library', isOverview: false }
            },
            {
                path: 'vault',
                name: 'AdminVault',
                component: SharedVault,
                meta: { titleKey: 'nav.vault', isOverview: false }
            },
            {
                path: 'resources',
                name: 'AdminResources',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.resources', isOverview: false }
            },
        ]
    },

    {
        path: '/dashboard/student',
        component: IndexStudent,
        meta: { requiresAuth: true, role: 'mahasiswa' },
        children: [
            {
                path: '',
                name: 'StudentOverview',
                meta: { titleKey: 'nav.dashboard', isOverview: true }
            },
            {
                path: 'schedule',
                name: 'StudentSchedule',
                component: SharedSchedules,
                meta: { titleKey: 'nav.schedules', isOverview: false }
            },
            {
                path: 'library',
                name: 'StudentLibrary',
                component: SharedLibrary,
                meta: { titleKey: 'nav.library', isOverview: false }
            },
            {
                path: 'vault',
                name: 'StudentVault',
                component: SharedVault,
                meta: { titleKey: 'nav.vault', isOverview: false }
            },
            {
                path: 'gallery',
                name: 'StudentGallery',
                component: SharedGallery,
                meta: { titleKey: 'nav.gallery', isOverview: false }
            },
            {
                path: 'profile',
                name: 'StudentProfile',
                component: SharedProfile,
                meta: { titleKey: 'nav.profile', isOverview: false }
            },
            {
                path: 'grades',
                name: 'StudentGrades',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.grades', isOverview: false }
            },
            {
                path: 'assignments',
                name: 'StudentTasks',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.tasks', isOverview: false }
            }
        ]
    },

    { path: '/gallery/:slug', name: 'GalleryDetail', component: GalleriDetail, meta: { titleKey: 'nav.gallery' } },
    { path: '/students', name: 'StudentPublic', component: Student, meta: { titleKey: 'nav.students' } },
    { path: '/students/:slug', name: 'StudentDetail', component: StudentDetail, meta: { titleKey: 'nav.students' } },
    { path: '/events', name: 'EventsPublic', component: Events, meta: { titleKey: 'nav.event' } },

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