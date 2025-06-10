import {createApp} from 'vue'
import {IonicVue} from '@ionic/vue'
import {createRouter, createWebHistory} from '@ionic/vue-router'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import PracticePage from './components/PracticePage.vue'
import ResultsPage from './components/ResultsPage.vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.system.css'
import './style.css'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/practice',
    name: 'Practice',
    component: PracticePage
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsPage
  }
]

// Use createRouter from @ionic/vue-router instead of vue-router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const app = createApp(App)

app.use(IonicVue)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})