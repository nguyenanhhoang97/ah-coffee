'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import store from '@/store';
import routes from './routes';
import { ACCESS_TOKEN_KEY } from '@/core/constants';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title =
    to.meta.title + ' | AHCoffee Management System' || 'AH Coffee';

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
      axios.defaults.headers.authorization = localStorage.getItem(
        ACCESS_TOKEN_KEY
      );
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
