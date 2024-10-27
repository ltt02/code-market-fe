import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ProductCart from '@/views/ProductCart.vue'
import ProductListView from '@/views/ProductListView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserInfo from '@/views/UserInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      alias: ["/", ""],
      name: 'home',
      component: HomeView
    },
    {
      path: '/application-list',
      name: 'applicationList',
      component: ProductListView,
    },
    {
      path: '/application-list/:id',
      name: 'application',
      component: ProductDetail,
    },
    {
      path: '/cart',
      name: 'cart',
      component: ProductCart,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserInfo,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
