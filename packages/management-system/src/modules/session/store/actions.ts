import axios from 'axios';
import { ActionTree } from 'vuex';

import router from '@/router';
import { SessionState } from './types';
import { RootState } from '@/store/types';
import {
  ACCESS_TOKEN_KEY,
  AUTH_HEADER_KEY,
  API_ENDPOINT
} from '@/core/constants';
import {
  SET_USER,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_REQUEST,
  SET_PROFILE
} from './types';

export const actions: ActionTree<SessionState, RootState> = {
  login({ commit }, { username, password }): Promise<any> {
    return axios({
      method: 'post',
      url: API_ENDPOINT + '/user/login',
      data: {
        usrnm: username,
        psw: password
      }
    })
      .then((response: any) => {
        const { token } = response.data;
        if (token === undefined) {
          const { message } = response.data;
          return message;
        } else {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);

          axios.defaults.headers.common[AUTH_HEADER_KEY] = `Bearer ${token}`;

          commit(AUTH_SUCCESS, token);
          router.push({ path: '/' });
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  logout({ commit }): Promise<any> {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      resolve();
      router.push({ path: '/login' });
    });
  }
};
