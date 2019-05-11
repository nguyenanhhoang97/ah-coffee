import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  MyBillState,
  SET_BILLS,
  LOADING
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<MyBillState, RootState> = {
  billList({ commit }, { pageIndex, pageSize }): Promise<any> {
    commit(LOADING, true);
    return axios({
      method: 'get',
      url: API_ENDPOINT + '/bill/get-bill-list-by-salesperson',
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
