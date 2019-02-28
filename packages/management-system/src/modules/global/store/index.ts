import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { GlobalState } from './types';
import { RootState } from '@/store/types';

export const state: GlobalState = {
  ready: false,
  dataColor: 'blue'
};

const namespaced: boolean = true;

export const global: Module<GlobalState, RootState> = {
  namespaced,
  state,
  getters: {},
  actions,
  mutations
};
