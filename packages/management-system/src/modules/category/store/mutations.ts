import { MutationTree } from 'vuex';
import { CategoryState, SET_CATEGORIES, LOADING } from './types';

export const mutations: MutationTree<CategoryState> = {
  [SET_CATEGORIES](state: CategoryState, list: any) {
    state.categories = list;
  },

  [LOADING](state: CategoryState, flag: boolean) {
    state.loading = flag;
  }
};
