import { ActionTree } from 'vuex';
import {
  OrderBoardState,
  LOADING,
  SET_PRODUCT_TO_ORDERBOARD,
  SET_TOTAL_PRICE
} from './types';
import { RootState } from '@/store/types';

export const actions: ActionTree<OrderBoardState, RootState> = {};
