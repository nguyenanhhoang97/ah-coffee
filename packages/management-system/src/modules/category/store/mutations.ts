import { MutationTree } from 'vuex';
import {
  CategoryState,
  SET_CATEGORIES,
  LOADING,
  CREATE_CATEGORY_STATUS,
  UPDATE_CATEGORY_STATUS,
  CHANGE_ST_CATE_STATUS,
  DELETE_CATE_STATUS
} from './types';

export const mutations: MutationTree<CategoryState> = {
  [SET_CATEGORIES](state: CategoryState, list: any) {
    state.categories = list;
  },

  [LOADING](state: CategoryState, flag: boolean) {
    state.loading = flag;
  },

  [CREATE_CATEGORY_STATUS](state: CategoryState, createStatus: string) {
    state.createCateStatus = createStatus;
  },

  [UPDATE_CATEGORY_STATUS](state: CategoryState, updateStatus: string) {
    state.updateCateStatus = updateStatus;
  },

  [CHANGE_ST_CATE_STATUS](state: CategoryState, stCateStatus: string) {
    state.changeStCateStatus = stCateStatus;
  },

  [DELETE_CATE_STATUS](state: CategoryState, deleteStatus: string) {
    state.deleteCateStatus = deleteStatus;
  }
};
