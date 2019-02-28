// import Vue from 'vue';
// import Router from 'vue-router';
// import Home from './views/Home.vue';

// Vue.use(Router);

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
//     },
//   ],
// });

// export const ANY = '*';
export const ROOT = '/';
// export const FORBIDEN = '/403';
// export const NOT_FOUND = '/404';
// export const INTERNAL_ERROR_SERVER = '/500';
// export const LOGIN = '/login';

export default [
  // {
  //   path: ANY,
  //   meta: {
  //     title: 'Not Found'
  //   },
  //   redirect: {
  //     path: NOT_FOUND
  //   }
  // },
  // {
  //   path: NOT_FOUND,
  //   meta: {
  //     title: 'Not Found'
  //   },
  //   name: 'NotFound',
  //   component: () =>
  //     import(/* webpackChunkName: "routes" */
  //       /* webpackMode: "lazy" */
  //       '@/modules/pages/NotFound.vue')
  // },
  // {
  //   path: FORBIDEN,
  //   meta: {
  //     title: 'Access Denied'
  //   },
  //   name: 'AccessDenied',
  //   component: () =>
  //     import(/* webpackChunkName: "routes" */
  //       /* webpackMode: "lazy" */
  //       '@/modules/pages/Deny.vue')
  // },
  // {
  //   path: INTERNAL_ERROR_SERVER,
  //   meta: {
  //     title: 'Internal Error Server'
  //   },
  //   name: 'ServerError',
  //   component: () =>
  //     import(/* webpackChunkName: "routes" */
  //       /* webpackMode: "lazy" */
  //       '@/modules/pages/Error.vue')
  // },
  // {
  //   path: LOGIN,
  //   name: 'Login',
  //   component: () =>
  //     import(/* webpackChunkName: "routes" */
  //       /* webpackMode: "lazy" */
  //       '@/modules/session/login.vue'),
  //   meta: {
  //     title: 'Login'
  //   }
  // },
  {
    path: ROOT,
    meta: {
      // requiresAuth: true
    },
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/dashboard/index.vue')
  }
  {
    path: '/home',
    meta: {},
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/vue/Home.vue')
  },
  {
    path: '/about',
    meta: {},
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/vue/About.vue')
  }
];
