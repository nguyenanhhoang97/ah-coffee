export const SET_SALESPERSON = 'SET_SALESPERSON';
export const LOADING = 'LOADING';
export const UPDATE_SALESPERSON_STATUS = 'UPDATE_SALESPERSON_STATUS';

export interface SalesPersonState {
  salespersons: any;
  loading: boolean;
  updateSalesPersonStatus: string;
}
