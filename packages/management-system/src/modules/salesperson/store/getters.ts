import { GetterTree } from 'vuex';
import { SalesPersonState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<SalesPersonState, RootState> = {
  getSalesperson(state: SalesPersonState): any {
    return state.salespersons;
  },

  getLoading(state: SalesPersonState): any {
    return state.loading;
  }
};
