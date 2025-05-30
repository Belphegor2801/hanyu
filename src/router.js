import { createRouter, createWebHistory } from 'vue-router';
import commonFn from '@/commons/commonFunction';

const routes = [
    {
        path: '/hanyu',
        name: "main",
        component: () => import('@/views/pinyin/PinyinView.vue'),
    },
    {
        path: '/hanyu/pinyin',
        name: "pinyin",
        component: () => import('@/views/pinyin/PinyinView.vue'),
    },
    {
        path: '/hanyu/radicals',
        name: "radicals",
        component: () => import('@/views/radicals/RadicalsView.vue'),
    },
    {
        path: '/hanyu/revision',
        name: "revision",
        component: () => import('@/views/revision/RevisionView.vue'),
    },
    {
        path: '/hanyu/tools',
        name: "tool",
        component: () => import('@/views/tools/ToolsView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.name);
    // Perform any checks here
    next()
    commonFn.mask();
});

router.afterEach(() => {
    commonFn.unmask();
});

export default router;