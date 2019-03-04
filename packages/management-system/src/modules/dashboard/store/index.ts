import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { DashboardState } from './types';
import { RootState } from '@/store/types';

export const state: DashboardState = {
  statistics: {
    products: 150,
    bills: 590,
    customers: 950,
    revenues: '5000$'
  }
};

const namespaced: boolean = true;

export const dashboard: Module<DashboardState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
