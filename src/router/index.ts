import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/index.vue'
import WelcomeView from '../views/welcome.vue'
import SettingsView from '../views/settings/index.vue'
import OrdersView from '../views/orders/index.vue'
import DashboardView from '../views/dashboard.vue'
import CustomersView from '../views/customers/index.vue'
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
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
      meta: {
        Layout: PublicLayout
      }
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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        Layout: DefaultLayout
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DashboardView
    },
    {
      path: '/customers',
      name: 'customers',
      meta: {
        Layout: DefaultLayout
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CustomersView
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
      path: '/orders',
      name: 'orders',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: OrdersView,
      meta: {
        Layout: DefaultLayout
      }
      // children: [
      //   {
      //     path: '',
      //     name: 'products',
      //     component: ProductsView
      //   },
      //   {
      //     path: 'subscriptions',
      //     name: 'subscriptions',
      //     // route level code-splitting
      //     // this generates a separate chunk (About.[hash].js) for this route
      //     // which is lazy-loaded when the route is visited.
      //     component: SubscriptionsView
      //   }
      // ]
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
