import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../containers/LandingPage'),
    meta: {
      title: "French vACC"
    },
    children: [
      {
        path: '/',
        name: 'Landingpage.index',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: 'atc',
        name: 'Landingpage.ATC',
        component: () => import('../views/Landingpage/ATC'),
      },
      {
        path: 'pilots',
        name: 'Landingpage.Pilots',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: 'feedback',
        name: 'Landingpage.Feedback',
        component: () => import('../views/Landingpage/Feedback'),
      },
      {
        path: 'contact',
        name: 'Landingpage.Contact',
        component: () => import('../views/Landingpage/Home'),
      },
      {
        path: 'discord',
        // beforeEnter() {
        //   window.location = "https://vatsim.fr/discord";
        // }
      },
      {
        path: 'policies',
        name: 'Landingpage.policies',
        component: () => import('../views/Landingpage/Policies')
      },
      {
        path: 'contact',
        name: 'Landingpage.contact',
      },
      {
        path: 'login',
        name: 'login',
        beforeEnter: (to, from, next) => {
          store.dispatch('VatsimSSO/authenticateUser');
          if (from.name !== null) {
            return next({ name: from.name });
          }
          next({ name: 'Landingpage.index' });
        },
      },
      {
        path: 'ssologin',
        beforeEnter: async(to, from, next) => {
          if (to.query.code) {
            store.dispatch('VatsimSSO/authenticateData', to.query.code)
          }
          next({ name: 'Landingpage.index' });
        },
      },
      {
        path: 'logout',
        name: 'logout',
        beforeEnter: (async(to, from, next) => {
          store.dispatch('VatsimSSO/logoutUser');
          next({ name: "Landingpage.index" });
        })
      }
    ]
  },
  {
    path: '/app',
    component: () => import('../containers/Dashboard'),
    meta: {
      requiresAuthenticated: true,
      title: `French vACC - App`,
    },
    redirect: { name: 'Dashboard.index' },
    children: [
      {
        path: '',
        name: 'Dashboard.index',
        component: () => import('../views/App/Index')
      },
      {
        path: 'library',
        name: 'Dashboard.library',
      },
      {
        path: 'calendar',
        name: 'Dashboard.calendar',
      },
      {
        path: 'profile',
        children: [
          {
            path: 'mystats',
            name: 'Dashboard.profile.mystats',
          },
          {
            path: 'mysettings',
            name: 'Dashboard.profile.mysettings',
          },
        ]
      },
      {
        path: 'atc',
        children: [
          {
            path: 'roster',
            name: 'Dashboard.atc.roster'
          },
          {
            path: 'booking',
            name: 'Dashboard.atc.booking'
          },
          {
            path: 'resources',
            name: 'Dashboard.atc.resources'
          },
        ]
      },
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
  // Checks if loader is stuck
  if (!localStorage.getItem('loadingContent') && store.state.AppState.loadingContent == true) {
    store.dispatch('AppState/setLoading');
  }

  // Checks if VUEX data is dead but still authenticated
  if (store.state.VatsimSSO.authenticated == false && localStorage.getItem('token')) {
    var fetchedUserDataState = store.getters['User/fetchUserData'];
    if (fetchedUserDataState) {
      next();
    }
  }

  // Set route titles from meta tags
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  const requiresAuthenticated = to.matched.some(record => record.meta.requiresAuthenticated);
  if (requiresAuthenticated && store.state.VatsimSSO.authenticated == false) {
    var isAuthenticated = store.getters['VatsimSSO/getAuthenticationState'];
    if (isAuthenticated == false) {
      store.dispatch('VatsimSSO/logoutUser');
      next({ name: 'Landingpage.index' });
    }
  }

  next();
})

export default router
