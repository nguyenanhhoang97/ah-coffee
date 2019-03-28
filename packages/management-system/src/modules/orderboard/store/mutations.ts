import { MutationTree } from 'vuex';
import {
  OrderBoardState,
  LOADING
} from './types';

export const mutations: MutationTree<OrderBoardState> = {
  [LOADING](state: OrderBoardState, flag: boolean) {
    state.loading = flag;
  }
};
