import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { CategoryState } from './types';
import { RootState } from '@/store/types';

export const state: CategoryState = {
  categories: {},
  loading: false,
  createCateStatus: '',
  updateCateStatus: '',
  changeStCateStatus: '',
  deleteCateStatus: '',
  statusList: [
    { value: 0, label: 'Pending' },
    {
      value: 1,
      label: 'Available'
    }
  ]
};

const namespaced: boolean = true;

export const category: Module<CategoryState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
