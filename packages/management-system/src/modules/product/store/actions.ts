import axios from 'axios';
import { ActionTree } from 'vuex';
import {
  ProductState,
  SET_PRODUCTS,
  LOADING,
  CREATE_PRODUCT_STATUS,
  UPDATE_PRODUCT_STATUS,
  CHANGE_ST_PRODUCT_STATUS,
  DELETE_CATE_STATUS
} from './types';
import { RootState } from '@/store/types';
import { API_ENDPOINT } from '@/core/constants';

export const actions: ActionTree<ProductState, RootState> = {};
