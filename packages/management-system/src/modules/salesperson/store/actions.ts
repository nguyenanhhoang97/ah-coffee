import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  SalesPersonState,
  SET_SALESPERSON,
  LOADING,
  UPDATE_SALESPERSON_STATUS
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<SalesPersonState, RootState> = {
  salespersonList({ commit }, { pageIndex, pageSize }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/user/mng/get-sp-list',
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
            commit(SET_SALESPERSON, response.data);
            commit(LOADING, false);
          }, 1000);
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  updateSalesperson(
    { commit },
    { usrId, email, username, fullname, address, phoneNumber, usrRole }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/user/adm/update-usr-info';
    // tslint:disable-next-line
    let formData = new FormData();
    formData.append('usrId', usrId);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('fullname', fullname);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('usrRole', usrRole);
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
            commit(UPDATE_SALESPERSON_STATUS, message);
            commit(LOADING, false);
          }, 1000);
          return message;
        } else {
          commit(UPDATE_SALESPERSON_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
