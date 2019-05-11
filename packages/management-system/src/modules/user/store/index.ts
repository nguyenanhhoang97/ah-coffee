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
  updateUserStatus: '',
  newPsw: '',
  roles: [
    { value: 'admin', label: 'admin' },
    {
      value: 'manager',
      label: 'manager'
    },
    {
      value: 'salesperson',
      label: 'salesperson'
    },
    {
      value: 'customer',
      label: 'customer'
    }
  ]
};

const namespaced: boolean = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
