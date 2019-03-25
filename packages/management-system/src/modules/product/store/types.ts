export const SET_PRODUCTS = 'SET_PRODUCTS';
export const LOADING = 'LOADING';
export const CREATE_PRODUCT_STATUS = 'CREATE_PRODUCT_STATUS';
export const UPDATE_PRODUCT_STATUS = 'UPDATE_PRODUCT_STATUS';
export const CHANGE_ST_PRODUCT_STATUS = 'CHANGE_PRODUCT_STATUS';
export const DELETE_PRODUCT_STATUS = 'DELETE_PRODUCT_STATUS';

export interface ProductState {
  products: any;
  loading: boolean;
  createProductStatus: string;
  updateProductStatus: string;
  changeStProductStatus: string;
  deleteProductStatus: string;
  statusList: any;
}
