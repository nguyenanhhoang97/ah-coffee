export const SET_CATEGORIES = 'SET_CATEGORIES';
export const LOADING = 'LOADING';
export const UPDATE_CATEGORY_STATUS = 'UPDATE_CATEGORY_STATUS';

export interface CategoryState {
  categories: {};
  loading: boolean;
  updateCateStatus: string;
}
