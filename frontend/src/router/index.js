import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../i18n'

// PUBLIC VIEWS
import Home from '../views/Home.vue'
import LoginView from "../views/LoginView.vue"
import GalleriDetail from "../views/GalleriDetail.vue"
import Student from "../views/Student.vue"
import StudentDetail from "../views/StudentDetail.vue"
import Events from "../views/Events.vue"
import PublicLibrary from "../views/PublicLibrary.vue"

// ADMIN DASHBOARD
import IndexAdmin from "../views/dashboard/Admin/Index.vue"
import StudentsAdmin from "../views/dashboard/Admin/Student.vue"
import GalleryAdmin from "../views/dashboard/Admin/Gallery.vue"
import SchedulesAdmin from "../views/dashboard/Admin/Schedules.vue"
import OrganizationAdmin from "../views/dashboard/Admin/Organization.vue"
import SharedProfile from "../views/dashboard/Admin/Profile.vue"

// SHARED
import SharedSchedules from "../views/shared/Schedules.vue"
import SharedLibrary from "../views/shared/Library.vue"
import SharedVault from "../views/shared/Vault.vue"

// STUDENT DASHBOARD
import IndexStudent from "../views/dashboard/Student/Index.vue"

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

    // ================= ADMIN =================
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
                meta: { titleKey: 'nav.students' }
            },
            {
                path: 'gallery',
                name: 'AdminGallery',
                component: GalleryAdmin,
                meta: { titleKey: 'nav.gallery' }
            },
            {
                path: 'schedules',
                name: 'AdminSchedules',
                component: SchedulesAdmin,
                meta: { titleKey: 'nav.schedules' }
            },
            {
                path: 'organization',
                name: 'AdminOrganization',
                component: OrganizationAdmin,
                meta: { titleKey: 'nav.organization' }
            },
            {
                path: 'profile',
                name: 'AdminProfile',
                component: SharedProfile,
                meta: { titleKey: 'nav.profile' }
            },
            {
                path: 'library',
                name: 'AdminLibrary',
                component: SharedLibrary,
                meta: { titleKey: 'nav.library' }
            },
            {
                path: 'vault',
                name: 'AdminVault',
                component: SharedVault,
                meta: { titleKey: 'nav.vault' }
            },
            {
                path: 'resources',
                name: 'AdminResources',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.resources' }
            },
        ]
    },

    // ================= STUDENT =================
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
                meta: { titleKey: 'nav.schedules' }
            },
            {
                path: 'library',
                name: 'StudentLibrary',
                component: SharedLibrary,
                meta: { titleKey: 'nav.library' }
            },
            {
                path: 'vault',
                name: 'StudentVault',
                component: SharedVault,
                meta: { titleKey: 'nav.vault' }
            },
            {
                path: 'gallery',
                name: 'StudentGallery',
                component: GalleryAdmin,
                meta: { titleKey: 'nav.gallery' }
            },
            {
                path: 'profile',
                name: 'StudentProfile',
                component: SharedProfile,
                meta: { titleKey: 'nav.profile' }
            },
            {
                path: 'grades',
                name: 'StudentGrades',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.grades' }
            },
            {
                path: 'assignments',
                name: 'StudentTasks',
                component: () => import('../views/dashboard/Admin/UnderDevelopment.vue'),
                meta: { titleKey: 'nav.tasks' }
            }
        ]
    },

    // ================= PUBLIC =================
    {
        path: '/gallery/:slug',
        name: 'GalleryDetail',
        component: GalleriDetail,
        meta: { titleKey: 'nav.gallery' }
    },
    {
        path: '/students',
        name: 'StudentPublic',
        component: Student,
        meta: { titleKey: 'nav.students' }
    },
    {
        path: '/students/:slug',
        name: 'StudentDetail',
        component: StudentDetail,
        meta: { titleKey: 'nav.students' }
    },
    {
        path: '/events',
        name: 'EventsPublic',
        component: Events,
        meta: { titleKey: 'nav.event' }
    },
    {
        path: '/library',
        name: 'PublicLibrary',
        component: PublicLibrary,
        meta: { titleKey: 'nav.library' }
    },

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

// ================= GUARD =================
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.toLowerCase();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) return next({ name: 'Login' });

        const requiredRole = to.matched.find(r => r.meta.role)?.meta.role;
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