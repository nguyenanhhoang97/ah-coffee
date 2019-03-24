export const SET_CATEGORIES = 'SET_CATEGORIES';
export const LOADING = 'LOADING';
export const CREATE_CATEGORY_STATUS = 'CREATE_CATEGORY_STATUS';
export const UPDATE_CATEGORY_STATUS = 'UPDATE_CATEGORY_STATUS';
export const CHANGE_ST_CATE_STATUS = 'CHANGE_ST_CATE_STATUS';
export const DELETE_CATE_STATUS = 'DELETE_CATE_STATUS';

export interface CategoryState {
  categories: any;
  loading: boolean;
  createCateStatus: string;
  updateCateStatus: string;
  changeStCateStatus: string;
  deleteCateStatus: string;
  statusList: any;
}
