// export const ANY = '*';
export const ROOT = '/';
// export const FORBIDEN = '/403';
// export const NOT_FOUND = '/404';
// export const INTERNAL_ERROR_SERVER = '/500';
export const LOGIN = '/login';
export const CATEGORY = '/category';
export const CREATE_CATE = CATEGORY + '/create';
export const PRODUCT = '/product';
export const CREATE_PRODUCT = PRODUCT + '/create';

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
  {
    path: LOGIN,
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/session/login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: ROOT,
    meta: {
      requiresAuth: true,
      title: 'Dashboard'
    },
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/dashboard/index.vue')
  },
  {
    path: CATEGORY,
    meta: {
      requiresAuth: true,
      title: 'Manage Category'
    },
    name: 'Category',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/category/index.vue')
  },
  {
    path: CREATE_CATE,
    meta: {
      requiresAuth: true,
      title: 'Create New Category'
    },
    name: 'Create New Category',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/category/create.vue')
  },
  {
    path: PRODUCT,
    meta: {
      requiresAuth: true,
      title: 'Manage Product'
    },
    name: 'Manage Product',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/product/index.vue')
  },
  {
    path: CREATE_PRODUCT,
    meta: {
      requiresAuth: true,
      title: 'Create Product'
    },
    name: 'Create Product',
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/modules/product/create.vue')
  }
];
