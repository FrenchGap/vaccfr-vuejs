import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
        path: '/logout',
        name: 'Dashboard.logout',
        beforeEnter: (async(to, from, next) => {
          store.dispatch('VatsimSSO/delToken');
          store.dispatch('User/delUser');
          router.push({ name: "Landingpage.index" })
          next();
        })
      }
    ]
  },
  {
    path: '/app',
    component: () => import('../containers/Dashboard'),
    meta: {
      requiresAuthenticated: true,
    },
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
    redirect: { name: 'Landingpage.index' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async(to, from, next) => {
  if (to.query.code && to.name == "Landingpage.index") {
    await store.dispatch('VatsimSSO/authenticateUserData', to.query.code)
    router.push({ name: 'Landingpage.index' })
  }

  const requiresAuthenticated = to.matched.some(record => record.meta.requiresAuthenticated);
  if (requiresAuthenticated) {
    store.dispatch('VatsimSSO/checkAuthentication')
  }

  next();
})

export default router
