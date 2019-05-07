import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { global } from '@/modules/global/store';
import { dashboard } from '@/modules/dashboard/store';
import { session } from '@/modules/session/store';
import { category } from '@/modules/category/store';
import { product } from '@/modules/product/store';
import { profile } from '@/modules/profile/store';
import { orderBoard } from '@/modules/orderboard/store';
import { customer } from '@/modules/customer/store';
import { salesperson } from '@/modules/salesperson/store';

import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.1.0'
  },
  modules: {
    global,
    dashboard,
    session,
    category,
    product,
    profile,
    orderBoard,
    customer,
    salesperson
  },
  strict: process.env.NODE_ENV !== 'production'
};

export default new Vuex.Store<RootState>(store);
