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
        name: 'Landingpage.index',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: '/atc',
        name: 'Landingpage.ATC',
        component: () => import('../views/Landingpage/ATC'),
      },
      {
        path: '/pilots',
        name: 'Landingpage.Pilots',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: '/feedback',
        name: 'Landingpage.Feedback',
        component: () => import('../views/Landingpage/Feedback'),
      },
      {
        path: '/contact',
        name: 'Landingpage.Contact',
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
        // component: () => import('../views/Landingpage/Home'),
        redirect: '/app',
      },
      {
        path: '/logout',
        name: 'Logout',
        // component: () => import('../views/Landingpage/Home'),
        redirect: '/',
      }
    ]
  },
  {
    path: '/app',
    component: () => import('../containers/Dashboard'),
    children: [
      {
        path: '/',
        name: 'Dashboard.index',
        component: () => import('../views/App/Index')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
