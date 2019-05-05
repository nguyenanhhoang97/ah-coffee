import { GetterTree } from 'vuex';
import { CustomerState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<CustomerState, RootState> = {
  getCustomers(state: CustomerState): any {
    return state.customers;
  },

  getLoading(state: CustomerState): any {
    return state.loading;
  }
};
