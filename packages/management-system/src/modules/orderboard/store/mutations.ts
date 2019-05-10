import { MutationTree } from 'vuex';
import { OrderBoardState, LOADING, CREATE_BILL_STATUS } from './types';

export const mutations: MutationTree<OrderBoardState> = {
  [LOADING](state: OrderBoardState, flag: boolean) {
    state.loading = flag;
  },

  [CREATE_BILL_STATUS](state: OrderBoardState, status: string) {
    state.createBillStatus = status;
  }
};
