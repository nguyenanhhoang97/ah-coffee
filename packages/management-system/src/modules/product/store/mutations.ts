import { MutationTree } from 'vuex';
import {
  ProductState,
  SET_PRODUCTS,
  LOADING,
  CREATE_PRODUCT_STATUS,
  UPDATE_PRODUCT_STATUS,
  CHANGE_ST_PRODUCT_STATUS,
  DELETE_PRODUCT_STATUS
} from './types';

export const mutations: MutationTree<ProductState> = {
  [SET_PRODUCTS](state: ProductState, list: any) {
    state.products = list;
  },

  [LOADING](state: ProductState, flag: boolean) {
    state.loading = flag;
  },

  [CREATE_PRODUCT_STATUS](state: ProductState, status: string) {
    state.createProductStatus = status;
  },

  [UPDATE_PRODUCT_STATUS](state: ProductState, status: string) {
    state.updateProductStatus = status;
  },

  [CHANGE_ST_PRODUCT_STATUS](state: ProductState, status: string) {
    state.changeStProductStatus = status;
  },

  [DELETE_PRODUCT_STATUS](state: ProductState, status: string) {
    state.deleteProductStatus = status;
  }
};
