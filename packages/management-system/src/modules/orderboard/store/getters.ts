import { GetterTree } from 'vuex';
import { OrderBoardState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<OrderBoardState, RootState> = {
  getLoading(state: OrderBoardState): any {
    return state.loading;
  }
};
