export const SET_PRODUCT_TO_ORDERBOARD = 'SET_PRODUCT_TO_ORDERBOARD';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const LOADING = 'LOADING';

export interface OrderBoardState {
  prLst: [];
  totalPrice: any;
  loading: boolean;
}
