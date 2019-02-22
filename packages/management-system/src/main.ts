import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { i18n, loadLanguageAsync } from '@/locales';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// loadLanguageAsync
router.beforeEach((to, from, next) => {
  const lang = to.params.lang || 'en';
  loadLanguageAsync(lang).then(() => next());
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
