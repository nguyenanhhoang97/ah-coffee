import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { OrderBoardState } from './types';
import { RootState } from '@/store/types';

export const state: OrderBoardState = {
  loading: false
};

const namespaced: boolean = true;

export const orderBoard: Module<OrderBoardState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
