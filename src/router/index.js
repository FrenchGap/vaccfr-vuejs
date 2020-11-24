import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'

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
        name: 'Landingpage.pilots',
        component: () => import('../views/Landingpage/Pilots'),
      },
      {
        path: 'feedback',
        name: 'Landingpage.feedback',
        component: () => import('../views/Landingpage/Feedback'),
      },
      {
        path: 'contact',
        name: 'Landingpage.contact',
        component: () => import('../views/Landingpage/Contact'),
      },
      {
        path: 'discord',
        name: 'Landingpage.discord',
        beforeEnter: (to, from, next) => {
          window.open("https://vatsim.fr/discord", '_blank');
          next({ name: 'Landingpage.index' });
        }
      },
      {
        path: 'policies',
        name: 'Landingpage.policies',
        component: () => import('../views/Landingpage/Policies')
      },
      {
        path: 'login',
        name: 'login',
        beforeEnter: (to, from, next) => {
          store.dispatch('VatsimSSO/authenticateUser');
          if (to.query.redirect) {
            Cookies.set('postloginredirect', to.query.redirect);
          }
          if (from.name) {
            return next({ name: from.name });
          }
          next({ name: 'Landingpage.index' });
        },
      },
      {
        path: 'ssologin',
        beforeEnter: async(to, from, next) => {
          let nextRoute = "Landingpage.index";
          if (to.query.code) {
            store.dispatch('VatsimSSO/authenticateData', to.query.code)
          }
          if (Cookies.get('postloginredirect')) {
            nextRoute = Cookies.get('postloginredirect');
            Cookies.remove('postloginredirect');
          }
          next({ name: nextRoute });
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
        name: 'Dashboard.profile',
        component: () => import('../views/App/Profile'),
        children: [
          {
            path: 'settings',
            name: 'Dashboard.profile.settings',
          },
          {
            path: 'statistics',
            name: 'Dashboard.profile.stats'
          },
          {
            path: 'gdprdata',
            name: 'Dashboard.profile.gdprdata',
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
  // Checks locale exists in localstorage
  if (localStorage.getItem('locale') === null) {
    localStorage.setItem('locale', store.state.LocaleStore.locale);
  }

  // Checks if loader is stuck
  if (!localStorage.getItem('loadingContent') && store.state.AppState.loadingContent == true) {
    store.dispatch('AppState/setLoading');
  }

  // Checks if VUEX data is dead but still authenticated
  if (localStorage.getItem('token') && !store.state.VatsimSSO.token) {
    store.dispatch('AppState/setLoading', true);
    store.getters['User/fetchUserData']
    .then((response) => {
      if (response) {
        store.dispatch('VatsimSSO/setToken', localStorage.getItem('token'));
      }
    });
    store.dispatch('AppState/setLoading', false);
  }

  // Set route titles from meta tags
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Authenticated middleware
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
