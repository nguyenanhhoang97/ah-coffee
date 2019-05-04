import axios from 'axios';
import { ActionTree } from 'vuex';
import router from '@/router';
import {
  SessionState,
  SET_USER,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_REQUEST,
  SET_PROFILE,
  CURRENT_ROLE
} from './types';
import { RootState } from '@/store/types';
import {
  ACCESS_TOKEN_KEY,
  AUTH_HEADER_KEY,
  API_ENDPOINT,
  USR_ROLE
} from '@/core/constants';

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
        const { token, role } = response.data;
        if (token === undefined) {
          const { message } = response.data;
          return message;
        } else {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
          localStorage.setItem(USR_ROLE, role);

          axios.defaults.headers.authorization = token;

          commit(AUTH_SUCCESS, token);
          commit(CURRENT_ROLE, role);
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
      localStorage.removeItem(USR_ROLE);
      resolve();
      router.push({ path: '/login' });
    });
  }
};
