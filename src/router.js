import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'


const routes = [{
        path: '/home',
        component: Home,
        meta: {
            index: 0
        }
    },
    {
        path: '/',
        component: Home,
        meta: {
            index: 0
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            index: 0
        }
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})