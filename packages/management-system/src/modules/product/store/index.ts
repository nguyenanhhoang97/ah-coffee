import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import { ProductState } from './types';
import { RootState } from '@/store/types';

export const state: ProductState = {
  products: {},
  loading: false,
  createProductStatus: '',
  updateProductStatus: '',
  changeStProductStatus: '',
  deleteProductStatus: '',
  statusList: [
    { value: 0, label: 'Pending' },
    {
      value: 1,
      label: 'Available'
    }
  ]
};

const namespaced: boolean = true;

export const product: Module<ProductState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
