import { MutationTree } from 'vuex';
import { CategoryState, SET_CATEGORIES, LOADING, UPDATE_CATEGORY_STATUS } from './types';

export const mutations: MutationTree<CategoryState> = {
  [SET_CATEGORIES](state: CategoryState, list: any) {
    state.categories = list;
  },

  [LOADING](state: CategoryState, flag: boolean) {
    state.loading = flag;
  },

  [UPDATE_CATEGORY_STATUS](state: CategoryState, updateStatus: string) {
    state.updateCateStatus = updateStatus;
  }
};
