import { GetterTree } from 'vuex';
import { CategoryState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<CategoryState, RootState> = {
  getCategories(state: CategoryState): any {
    return state.categories;
  },

  getLoading(state: CategoryState): any {
    return state.loading;
  }
};
