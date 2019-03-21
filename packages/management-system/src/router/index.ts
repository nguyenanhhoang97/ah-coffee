'use strict';

import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'AH Coffee';

  const isLoginPage = to.matched.some(
    (p: any) => p.path.indexOf('/login') === 0
  );
  try {
    const isAuthenticated = store.getters['session/isAuthenticated'];
    const requiresAuth = to.matched.some((r: any) => r.meta.requiresAuth);

    if (isAuthenticated && isLoginPage) {
      return next('/');
    }

    if (requiresAuth && !isAuthenticated) {
      if (isLoginPage) {
        return next();
      }
      return next('login');
    } else {
      next();
    }
  } catch (err) {
    if (isLoginPage) {
      return next();
    }
    next('login');
  }
});

export default router;
