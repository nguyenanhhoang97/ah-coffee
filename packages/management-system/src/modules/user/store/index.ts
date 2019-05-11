import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { UserState } from './types';
import { RootState } from '@/store/types';

export const state: UserState = {
  users: {},
  loading: false,
  createUserStatus: '',
  updateUserStatus: ''
};

const namespaced: boolean = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
