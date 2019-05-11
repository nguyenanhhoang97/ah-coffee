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
export const PROFILE = '/profile';
export const ORDER_BOARD = '/orderboard';
export const CUSTOMER = '/customer';
export const SALESPERSON = '/salesperson';
export const BILL = '/bill';
export const MY_BILL = '/my-bill';

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
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/session/login.vue'
      ),
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
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/dashboard/index.vue'
      )
  },
  {
    path: CATEGORY,
    meta: {
      requiresAuth: true,
      title: 'Manage Category'
    },
    name: 'Category',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/category/index.vue'
      )
  },
  {
    path: CREATE_CATE,
    meta: {
      requiresAuth: true,
      title: 'Create New Category'
    },
    name: 'Create New Category',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/category/create.vue'
      )
  },
  {
    path: PRODUCT,
    meta: {
      requiresAuth: true,
      title: 'Manage Product'
    },
    name: 'Manage Product',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/product/index.vue'
      )
  },
  {
    path: CREATE_PRODUCT,
    meta: {
      requiresAuth: true,
      title: 'Create Product'
    },
    name: 'Create Product',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/product/create.vue'
      )
  },
  {
    path: PROFILE,
    meta: {
      requiresAuth: true,
      title: 'Profile'
    },
    name: 'Profile',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/profile/index.vue'
      )
  },
  {
    path: ORDER_BOARD,
    meta: {
      requiresAuth: true,
      title: 'OrderBoard'
    },
    name: 'OrderBoard',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/orderboard/index.vue'
      )
  },
  {
    path: CUSTOMER,
    meta: {
      requiresAuth: true,
      title: 'Manage Customer'
    },
    name: 'Customer',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/customer/index.vue'
      )
  },
  {
    path: SALESPERSON,
    meta: {
      requiresAuth: true,
      title: 'Manage Salesperson'
    },
    name: 'Salesperson',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/salesperson/index.vue'
      )
  },
  {
    path: BILL,
    meta: {
      requiresAuth: true,
      title: 'Manage Bill'
    },
    name: 'Manage Bill',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/bill/index.vue'
      )
  },
  {
    path: MY_BILL,
    meta: {
      requiresAuth: true,
      title: 'My Bill'
    },
    name: 'My Bill',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy" */
        '@/modules/my-bill/index.vue'
      )
  }
];
