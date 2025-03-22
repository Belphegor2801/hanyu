import { createRouter, createWebHistory } from 'vue-router';
import commonFn from '@/commons/commonFunction';

const routes = [
    {
        path: '/pinyin',
        name: "pinyin",
        component: () => import('@/views/pinyin/PinyinView.vue'),
    },
    {
        path: '/radicals',
        name: "radicals",
        component: () => import('@/views/radicals/RadicalsView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


// router.beforeEach((to, from, next) => {
//     commonFn.mask();
// });

// router.afterEach(() => {
//     commonFn.unmask();
// });

export default router;