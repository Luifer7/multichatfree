import { createRouter, createWebHistory } from 'vue-router'
import { useDataStore } from '../stores/data'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/fav',
      name: 'fav',
      component: () => import('../views/FavView.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: {
        auth: true,
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  
  const requiredAuth = to.meta.auth
  const useData = useDataStore()

  if (requiredAuth) {

    if (useData.isLogin) {
      return next()
    } 
    return next('/')
  }

   next()
})


export default router
