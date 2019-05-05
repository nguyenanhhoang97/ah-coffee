import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { CustomerState } from './types';
import { RootState } from '@/store/types';

export const state: CustomerState = {
  customers: {},
  loading: false,
  createCustomerStatus: '',
  updateCustomerStatus: ''
};

const namespaced: boolean = true;

export const customer: Module<CustomerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
