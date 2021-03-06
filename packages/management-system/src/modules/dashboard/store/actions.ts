import axios from 'axios';
import { ActionTree } from 'vuex';
import { DashboardState, SET_STATISTICS, SET_BILLS, LOADING } from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<DashboardState, RootState> = {
  total({ commit }, {}): Promise<any> {
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/total'
    })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          return message;
        } else {
          setTimeout(() => {
            commit(SET_STATISTICS, response.data);
          }, 1000);
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  },

  billList({ commit }, {}): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/bill/recent'
    })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          return message;
        } else {
          setTimeout(() => {
            commit(SET_BILLS, response.data);
            commit(LOADING, false);
          }, 1000);
          return response.data;
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
