import VueRouter from 'vue-router'

import SpanionAbout from './pages/SpanionAbout.vue'
import SpanionContact from './pages/SpanionContact.vue'
import SpanionHome from './pages/SpanionHome.vue'
import SpanionNotFound from './pages/SpanionNotFound.vue'
import SpanionWork from './pages/SpanionWork.vue'


const routes = [{
        path: '/about',
        component: SpanionAbout,
        meta: {
            index: 1
        }
    },
    {
        path: '/work',
        component: SpanionWork,
        meta: {
            index: 2
        }
    },
    {
        path: '/contact',
        component: SpanionContact,
        meta: {
            index: 3
        }
    },
    {
        path: '/home',
        component: SpanionHome,
        meta: {
            index: 0
        }
    },
    {
        path: '/',
        component: SpanionHome,
        meta: {
            index: 0
        }
    },
    {
        path: '*',
        component: SpanionNotFound,
        meta: {
            index: 0
        }
    }
]

export default new VueRouter({
    routes
})