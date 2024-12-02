import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductCart from "@/views/ProductCart.vue";
import ProductListView from "@/views/ProductListView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import RegisterDeveloperView from "@/views/RegisterDeveloperView.vue";
import UserInfo from "@/views/UserInfo.vue";
import DeveloperPage from "@/views/DeveloperPage.vue";
import SysAdminPage from "@/views/SysAdminPage.vue";
import SysAdLoginPage from "@/views/SysAdLoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      alias: ["/", ""],
      name: "home",
      component: HomeView,
    },
    {
      path: "/application-list",
      name: "applicationList",
      component: ProductListView,
    },
    {
      path: "/application-list/:id",
      name: "application",
      component: ProductDetail,
    },
    {
      path: "/cart",
      name: "cart",
      component: ProductCart,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/register-dev",
      name: "registerDev",
      component: RegisterDeveloperView,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserInfo,
    },
    {
      path: "/developer",
      name: "developer",
      component: DeveloperPage,
    },
    {
      path: "/sysad",
      name: "sysad",
      component: SysAdminPage,
    },
    {
      path: "/sysad/login",
      name: "sysAdLogin",
      component: SysAdLoginPage,
    },
    {
      path: "/account",
      component: () => import("@/views/UserInfo.vue"),
      // meta: { requiresAuth: true },
      children: [
        {
          path: "info",
          name: "userInfo",
          component: () =>
            import("@/components/profile/account-content/AccountContent.vue"),
        },
        {
          path: "orders",
          name: "myOrders",
          component: () =>
            import("@/components/profile/account-content/OrderContent.vue"),
        },
        {
          path: "coupons",
          name: "myCoupons",
          component: () =>
            import("@/components/profile/account-content/VoucherContent.vue"),
        },
        // {
        //   path: "addresses",
        //   name: "myAddresses",
        //   component: () =>
        //     import("@/components/profile/account-content/AddressContent.vue"),
        // },
        {
          path: "reviews",
          name: "myReviews",
          component: () =>
            import("@/components/profile/account-content/ReviewContent.vue"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
