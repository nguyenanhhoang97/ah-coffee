import { GetterTree } from 'vuex';
import { ProductState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<ProductState, RootState> = {
  getProducts(state: ProductState): any {
    return state.products;
  },

  getLoading(state: ProductState): any {
    return state.loading;
  }
};
