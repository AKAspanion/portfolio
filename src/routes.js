import AboutPage from './components/AboutPage.vue'
import ContactPage from './components/ContactPage.vue'
import HomePage from './components/HomePage.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import WorkPage from './components/WorkPage.vue'

export default [
    {path: '/about', component: AboutPage},
    {path: '/contact', component: ContactPage},    
    {path: '/home', component: HomePage},
    {path: '/work', component: WorkPage},
    {path: '/', component:HomePage},
    {path: '*', component:NotFoundPage}
]