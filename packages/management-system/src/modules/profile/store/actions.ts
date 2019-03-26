import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  ProfileState,
  SET_PROFILE,
  LOADING,
  UPDATE_PROFILE_STATUS,
  UPDATE_PASSWORD_STATUS
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<ProfileState, RootState> = {
  currentUser({ commit }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/user/current-user'
    })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          return message;
        } else {
          setTimeout(() => {
            commit(SET_PROFILE, response.data);
            commit(LOADING, false);
          }, 1000);
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  updateProfile(
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
            commit(UPDATE_PROFILE_STATUS, message);
            commit(LOADING, false);
          }, 1000);
          return message;
        } else {
          commit(UPDATE_PROFILE_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  changePassword({ commit }, { oldpsw, psw }): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/user/change-password';
    return axios
      .post(url, {
        oldpsw,
        psw
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          setTimeout(() => {
            commit(UPDATE_PASSWORD_STATUS, message);
            commit(LOADING, false);
          }, 1000);
          return message;
        } else {
          commit(UPDATE_PASSWORD_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
