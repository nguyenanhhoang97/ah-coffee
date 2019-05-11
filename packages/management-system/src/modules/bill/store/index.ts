import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { BillState } from './types';
import { RootState } from '@/store/types';

export const state: BillState = {
  bills: {},
  loading: false
};

const namespaced: boolean = true;

export const bill: Module<BillState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
