import { GetterTree } from 'vuex';
import { MyBillState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<MyBillState, RootState> = {
  getBills(state: MyBillState): any {
    return state.bills;
  },

  getLoading(state: MyBillState): any {
    return state.loading;
  }
};
