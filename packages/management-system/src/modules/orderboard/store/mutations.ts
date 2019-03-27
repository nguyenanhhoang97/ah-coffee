import { MutationTree } from 'vuex';
import {
  OrderBoardState,
  LOADING,
  SET_PRODUCT_TO_ORDERBOARD,
  SET_TOTAL_PRICE
} from './types';

export const mutations: MutationTree<OrderBoardState> = {
  [LOADING](state: OrderBoardState, flag: boolean) {
    state.loading = flag;
  },

  [SET_PRODUCT_TO_ORDERBOARD](state: OrderBoardState, list: any) {
    state.prLst = list;
  },

  [SET_TOTAL_PRICE](state: OrderBoardState, price: any) {
    state.totalPrice = price;
  }
};
