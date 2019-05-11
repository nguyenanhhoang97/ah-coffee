import { GetterTree } from 'vuex';
import { BillState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<BillState, RootState> = {
  getBills(state: BillState): any {
    return state.bills;
  },

  getLoading(state: BillState): any {
    return state.loading;
  }
};
