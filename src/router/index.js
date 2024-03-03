import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/MainPage.vue'
import ExchangePage from '../components/ExchangePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/exchange',
    name: 'ExchangePage',
    component: ExchangePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
