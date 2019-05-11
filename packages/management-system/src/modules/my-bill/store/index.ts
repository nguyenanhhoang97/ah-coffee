import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { MyBillState } from './types';
import { RootState } from '@/store/types';

export const state: MyBillState = {
  bills: {},
  loading: false
};

const namespaced: boolean = true;

export const myBill: Module<MyBillState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
