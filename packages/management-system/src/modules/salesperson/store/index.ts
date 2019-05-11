import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { SalesPersonState } from './types';
import { RootState } from '@/store/types';

export const state: SalesPersonState = {
  salespersons: {},
  loading: false,
  updateSalesPersonStatus: '',
  roles: [
    {
      value: 'salesperson',
      label: 'salesperson'
    },
    {
      value: 'customer',
      label: 'customer'
    }
  ]
};

const namespaced: boolean = true;

export const salesperson: Module<SalesPersonState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
