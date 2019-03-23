import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  CategoryState,
  SET_CATEGORIES,
  LOADING,
  UPDATE_CATEGORY_STATUS
} from './types';
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
  },

  createCategory({ commit }, { name, introduction, file }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/category/create';
    let formData = new FormData();
    formData.append('name', name);
    formData.append('introduction', introduction);
    formData.append('file', file);
    return axios
      .post(url, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(UPDATE_CATEGORY_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(UPDATE_CATEGORY_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
