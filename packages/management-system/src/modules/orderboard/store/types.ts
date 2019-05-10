export const LOADING = 'LOADING';
export const CREATE_BILL_STATUS = 'CREATE_BILL_STATUS';

export interface OrderBoardState {
  loading: boolean;
  paymentMethod: any[];
  createBillStatus: string;
}
