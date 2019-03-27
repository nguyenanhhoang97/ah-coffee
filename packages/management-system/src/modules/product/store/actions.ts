import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  ProductState,
  SET_PRODUCTS,
  LOADING,
  CREATE_PRODUCT_STATUS,
  UPDATE_PRODUCT_STATUS,
  CHANGE_ST_PRODUCT_STATUS,
  DELETE_PRODUCT_STATUS
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
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  createProduct(
    { commit },
    { name, category, introduction, price, file }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/product/create';
    // tslint:disable-next-line
    let formData = new FormData();
    formData.append('name', name);
    formData.append('categoryId', category);
    formData.append('introduction', introduction);
    formData.append('price', price);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < file.length; i++) {
      formData.append('file' + i, file[i]);
    }
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
          commit(CREATE_PRODUCT_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CREATE_PRODUCT_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  updateProduct(
    { commit },
    { productId, name, categoryId, price, introduction, file }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/product/update';
    // tslint:disable-next-line
    let formData = new FormData();
    formData.append('productId', productId);
    formData.append('name', name);
    formData.append('categoryId', categoryId);
    formData.append('price', price);
    formData.append('introduction', introduction);
    if (file !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < file.length; i++) {
        formData.append('file' + i, file[i]);
      }
    }
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
          commit(UPDATE_PRODUCT_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(UPDATE_PRODUCT_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  changeProductStatus({ commit }, { productId, productStatus }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/product/update/status';
    return axios
      .post(url, {
        productId,
        productStatus
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(CHANGE_ST_PRODUCT_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CHANGE_ST_PRODUCT_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  deleteCate({ commit }, { productId, productStatus }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/product/update/status';
    return axios
      .post(url, {
        productId,
        productStatus
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(DELETE_PRODUCT_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(DELETE_PRODUCT_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
