import Vue from 'vue';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueElementLoading from 'vue-element-loading';

import App from './App.vue';
import router from '@/router';
import store from '@/store';
import { i18n, loadLanguageAsync } from '@/locales';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component('VueElementLoading', VueElementLoading);

axios.defaults.headers.post['Content-Type'] = 'application/json';

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
