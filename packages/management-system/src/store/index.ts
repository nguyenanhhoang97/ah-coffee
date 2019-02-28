import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { global } from '@/modules/global/store';
// import { session } from '@/modules/session/store';
// import { dashboard } from '@/modules/dashboard/store';

import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.1.0' // a simple property
  },
  modules: {
    global,
    // session,
    // dashboard,
  },
  strict: process.env.NODE_ENV !== 'production'
};

export default new Vuex.Store<RootState>(store);
