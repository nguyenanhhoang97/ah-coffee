import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  CategoryState,
  SET_CATEGORIES,
  LOADING,
  CREATE_CATEGORY_STATUS,
  UPDATE_CATEGORY_STATUS,
  CHANGE_ST_CATE_STATUS,
  DELETE_CATE_STATUS
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
    // tslint:disable-next-line
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
          commit(CREATE_CATEGORY_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CREATE_CATEGORY_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  updateCategory({ commit }, { categoryId, name, introduction, file, oldPath }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/category/update';
    // tslint:disable-next-line
    let formData = new FormData();
    formData.append('categoryId', categoryId);
    formData.append('name', name);
    formData.append('introduction', introduction);
    formData.append('file', file);
    formData.append('oldPath', oldPath);
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
  },

  changeCateStatus({ commit }, { categoryId, cateStatus }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/category/update/status';
    return axios
      .post(url, {
        categoryId,
        cateStatus
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(CHANGE_ST_CATE_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CHANGE_ST_CATE_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  deleteCate({ commit }, { categoryId, cateStatus }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/category/update/status';
    return axios
      .post(url, {
        categoryId,
        cateStatus
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(DELETE_CATE_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(DELETE_CATE_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
