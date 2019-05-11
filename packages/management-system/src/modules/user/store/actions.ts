import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  UserState,
  SET_USER,
  LOADING,
  CREATE_USER_STATUS,
  UPDATE_USER_STATUS,
  ADM_RESET_PSW_NEW_PSW
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<UserState, RootState> = {
  userList({ commit }, { pageIndex, pageSize }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/user/adm/get-usr-lst',
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
            commit(SET_USER, response.data);
            commit(LOADING, false);
          }, 1000);
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  createUser(
    { commit },
    { email, username, password, fullname, address, phoneNumber }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/user/register';
    return axios
      .post(url, { email, username, password, fullname, address, phoneNumber })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(CREATE_USER_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CREATE_USER_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  updateUser(
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
            commit(UPDATE_USER_STATUS, message);
            commit(LOADING, false);
          }, 1000);
          return message;
        } else {
          commit(UPDATE_USER_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  admResetPassword({ commit }, { usrId }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/user/adm/reset-usr-psw';
    return axios
      .post(url, { usrId })
      .then((response: any) => {
        const { new_password } = response.data;
        if (new_password !== undefined) {
          commit(ADM_RESET_PSW_NEW_PSW, new_password);
          commit(LOADING, false);
          return new_password;
        } else {
          commit(ADM_RESET_PSW_NEW_PSW, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
