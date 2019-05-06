import { MutationTree } from 'vuex';
import {
  CustomerState,
  SET_CUSTOMER,
  LOADING,
  CREATE_CUSTOMER_STATUS,
  UPDATE_CUSTOMER_STATUS
} from './types';

export const mutations: MutationTree<CustomerState> = {
  [SET_CUSTOMER](state: CustomerState, list: any) {
    state.customers = list;
  },

  [LOADING](state: CustomerState, flag: boolean) {
    state.loading = flag;
  },

  [CREATE_CUSTOMER_STATUS](state: CustomerState, status: string) {
    state.createCustomerStatus = status;
  },

  [UPDATE_CUSTOMER_STATUS](state: CustomerState, status: string) {
    state.updateCustomerStatus = status;
  }
};
