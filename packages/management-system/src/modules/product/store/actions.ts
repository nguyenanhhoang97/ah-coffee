import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  ProductState,
  SET_PRODUCTS,
  LOADING,
  CREATE_PRODUCT_STATUS,
  UPDATE_PRODUCT_STATUS,
  CHANGE_ST_PRODUCT_STATUS,
  DELETE_CATE_STATUS
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<ProductState, RootState> = {
  productList({ commit }, { pageIndex, pageSize }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/product',
      params: {
        pageIndex,
        pageSize
      }
    })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          return message;
        } else {
          setTimeout(() => {
            commit(SET_PRODUCTS, response.data);
            commit(LOADING, false);
          }, 1000);
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },
};
