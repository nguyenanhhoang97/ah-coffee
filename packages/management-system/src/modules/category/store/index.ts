import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { CategoryState } from './types';
import { RootState } from '@/store/types';

export const state: CategoryState = {
  categories: {},
  loading: false
};

const namespaced: boolean = true;

export const category: Module<CategoryState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
