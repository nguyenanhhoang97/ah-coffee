import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { ProfileState } from './types';
import { RootState } from '@/store/types';

export const state: ProfileState = {
  profile: {},
  loading: false,
  updatePasswordStatus: '',
  updateProfileStatus: ''
};

const namespaced: boolean = true;

export const profile: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
