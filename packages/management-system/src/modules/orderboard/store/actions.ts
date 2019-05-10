import axios from 'axios';
import { ActionTree } from 'vuex';
import { OrderBoardState, LOADING, CREATE_BILL_STATUS } from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<OrderBoardState, RootState> = {
  createBill(
    { commit },
    { productList, customerId, totalPrice, paymentMethod, ccRC }
  ): Promise<any> {
    commit(LOADING, true);
    const url = API_ENDPOINT + '/bill/create';
    return axios
      .post(url, {
        productList,
        customerId,
        totalPrice,
        paymentMethod,
        ccRC
      })
      .then((response: any) => {
        const { message } = response.data;
        if (message !== undefined) {
          commit(CREATE_BILL_STATUS, message);
          commit(LOADING, false);
          return message;
        } else {
          commit(CREATE_BILL_STATUS, 'internal_error');
          commit(LOADING, false);
          return 'internal_error';
        }
      })
      .catch((error: any) => {
        throw error;
      });
  }
};
