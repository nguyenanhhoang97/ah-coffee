import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  CustomerState,
  SET_CUSTOMER,
  LOADING,
  CREATE_CUSTOMER_STATUS,
  UPDATE_CUSTOMER_STATUS
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<CustomerState, RootState> = {
  customerList({ commit }, { pageIndex, pageSize }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/user/salesperson/get-customer-list',
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
            commit(SET_CUSTOMER, response.data);
            commit(LOADING, false);
          }, 1000);
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  createCustomer(
    { commit },
    { email, username, password, fullname, address, phoneNumber }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/user/register';
    // tslint:disable-next-line
    let formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('fullname', fullname);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
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
          commit(CREATE_CUSTOMER_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CREATE_CUSTOMER_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  updateCustomer(
    { commit },
    { fullname, email, address, phoneNumber, file, oldPath }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/user/update-profile';
    // tslint:disable-next-line
    let formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
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
          setTimeout(() => {
            commit(UPDATE_CUSTOMER_STATUS, message);
            commit(LOADING, false);
          }, 1000);
          return message;
        } else {
          commit(UPDATE_CUSTOMER_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
