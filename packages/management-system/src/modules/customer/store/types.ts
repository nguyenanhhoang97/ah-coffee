export const SET_CUSTOMER = 'SET_CUSTOMER';
export const LOADING = 'LOADING';
export const CREATE_CUSTOMER_STATUS = 'CREATE_CUSTOMER_STATUS';
export const UPDATE_CUSTOMER_STATUS = 'UPDATE_CUSTOMER_STATUS';

export interface CustomerState {
  customers: any;
  loading: boolean;
  createCustomerStatus: string;
  updateCustomerStatus: string;
}
