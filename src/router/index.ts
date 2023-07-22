import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', component: () => import('../components/BusLines.vue'), children: []
    },
    {
        path: '/stops', component: () => import('../components/BusStops.vue'), children: []
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
