import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../containers/LandingPage'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: '/atc',
        name: 'ATC',
        component: () => import('../views/Landingpage/ATC'),
      },
      {
        path: '/pilots',
        name: 'Pilots',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('../views/Landingpage/Feedback'),
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: '/discord',
        // beforeEnter() {
        //   window.location = "https://vatsim.fr/discord";
        // }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Landingpage/Home'),
      },
    ]
  },
  {
    path: '*',
    component: () => import('../views/Landingpage/Home'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
