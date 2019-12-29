import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Experience from './views/Experience.vue'
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
        path: '/about',
        component: About,
        meta: {
            index: 1
        }
    },
    {
        path: '/experience',
        component: Experience,
        meta: {
            index: 2
        }
    },
    {
        path: '/contact',
        component: Contact,
        meta: {
            index: 3
        }
    },
    {
        path: '/exp',
        component: Contact,
        meta: {
            index: 3
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