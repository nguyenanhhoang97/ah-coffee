import axios from 'axios';
import { ActionTree } from 'vuex';
import { CategoryState, SET_CATEGORIES, LOADING } from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<CategoryState, RootState> = {
  categoryList({ commit }, { pageIndex, pageSize }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/category',
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
            commit(SET_CATEGORIES, response.data);
            commit(LOADING, false);
          }, 1000);
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
