import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/index.vue'
import HomeView from '../views/home.vue'
import SettingsView from '../views/settings/index.vue'
import SalesView from '../views/sales/index.vue'
import ProductsView from '../views/sales/sales.vue'
import SubscriptionsView from '../views/sales/subscriptions.vue'
import RegisterView from '../views/register/index.vue'
import PublicLayout from '../layouts/public.vue'
import DefaultLayout from '../layouts/default.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView,
      meta: {
        Layout: PublicLayout
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        Layout: PublicLayout
      }
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SettingsView,
      meta: {
        Layout: DefaultLayout
      }
    },
    {
      path: '/sales',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SalesView,
      meta: {
        Layout: DefaultLayout
      },
      children: [
        {
          path: '',
          name: 'products',
          component: ProductsView
        },
        {
          path: 'subscriptions',
          name: 'subscriptions',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: SubscriptionsView
        }
      ]
    },

    {
      path: '/register',
      name: 'register',
      meta: {
        Layout: PublicLayout
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterView
    }
    // {
    //   path: '/notifications',
    //   name: 'notifications',
    //   meta: {
    //     Layout: DefaultLayout
    //   },
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: NotificationsView
    // }
  ]
})

export default router
