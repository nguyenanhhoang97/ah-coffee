import { ACCESS_TOKEN_KEY } from '@/core/constants';
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SessionState } from './types';
import { RootState } from '@/store/types';

export const state: SessionState = {
  token: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
  status: ''
};

const namespaced: boolean = true;

export const session: Module<SessionState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
