export const SET_STATISTICS = 'SET_STATISTICS';
export const SET_BILLS = 'SET_BILLS';
export const LOADING = 'LOADING';

export interface DashboardState {
  statistics: {};
  bills: any;
  loading: boolean;
}
