import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueElementLoading from 'vue-element-loading';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import { i18n, loadLanguageAsync } from '@/locales';
import locale from 'element-ui/lib/locale/lang/en';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('VueElementLoading', VueElementLoading);

axios.defaults.headers.post['Content-Type'] = 'application/json';

// loadLanguageAsync
router.beforeEach((to, from, next) => {
  const lang = to.params.lang || 'en';
  loadLanguageAsync(lang).then(() => next());
});

export const EventBus = new Vue({
  // eslint-disable-line no-new
  el: '#app',

  components: {
    App
  },

  router,
  store,
  i18n,
  render: h => h('app')
});
