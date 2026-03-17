import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../i18n'
import Home from '../views/Home.vue'
import LoginView from "../views/LoginView.vue";
import GalleriDetail from "../views/GalleriDetail.vue";
import Student from "../views/Student.vue";
import StudentDetail from "../views/StudentDetail.vue";
import Events from "../views/Events.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { titleKey: 'nav.home' }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { titleKey: 'nav.admin' }
    },
    {
        path: '/gallery/:slug',
        name: 'GalleryDetail',
        component: GalleriDetail,
        meta: { titleKey: 'nav.gallery' }
    },
    {
        path: '/students',
        name: 'Student',
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
        name: 'Events',
        component: Events,
        meta: { titleKey: 'nav.event' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.afterEach((to) => {
    const translatedTitle = to.meta.titleKey ? i18n.global.t(to.meta.titleKey) : 'Informatics 25';

    document.title = `${translatedTitle} - Informatics 25`;
});

export default router