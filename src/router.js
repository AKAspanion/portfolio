import VueRouter from 'vue-router'

import AboutPage from './components/AboutPage.vue'
import ContactPage from './components/ContactPage.vue'
import HomePage from './components/HomePage.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import WorkPage from './components/WorkPage.vue'


const routes = [
    {path: '/about', component: AboutPage, meta: {index: 1}},
    {path: '/work', component: WorkPage, meta: {index: 2}},    
    {path: '/contact', component: ContactPage, meta: {index: 3}},    
    {path: '/home', component: HomePage, meta: {index: 0}},
    {path: '/', component:HomePage, meta: {index: 0}},
    {path: '*', component:NotFoundPage, meta: {index: 0}}
]

export default new VueRouter({
    routes
})