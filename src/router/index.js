import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AppRoot',
    component: () => import('../containers/App'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home'),
      },
      {
        path: '/atc',
        name: 'ATC',
        component: () => import('../views/Home'),
      },
      {
        path: '/pilots',
        name: 'Pilots',
        component: () => import('../views/Home'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Home'),
      },
    ]
  },
  {
    path: '*',
    redirect: 'AppRoot'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
