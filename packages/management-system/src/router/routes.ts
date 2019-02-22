export const ANY = '*';
export const ROOT = '/';
export const ABOUT = '/about';

export default [
  // {
  //   path: ROOT,
  //   name: 'Dashboard',
  //   meta: {
  //     title: 'AHCoffee',
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy" */
  //     '@/modules/dashboard/index.vue'),
  // },
  {
    path: ROOT,
    name: 'home',
    meta: {
      title: 'AHCoffee',
    },
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/Home.vue'),
  },
  {
    path: ABOUT,
    name: 'about',
    meta: {
      title: 'AHCoffee',
    },
    component: () =>
      import(/* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/About.vue'),
  },
];
