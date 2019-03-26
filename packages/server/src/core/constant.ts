import dotenv from 'dotenv';

dotenv.load();

// ROUTES
// ----ROOT
export const ROOT = '/api/v1';
// ----USER
export const USER = ROOT + '/user';
export const CURRENT_USER = USER + '/current-user';
export const USER_REGISTER = USER + '/register';
export const USER_LOGIN = USER + '/login';
export const USER_UPDATE_PROFILE = USER + '/update-profile';
export const USER_UPDATE_PSW = USER + '/change-password';
export const USER_UPDATE_AVATAR = USER + '/change-avatar';
export const ADM = USER + '/adm';
export const ADM_UPDATE_USR_INFO = ADM + '/update-usr-info';
export const ADM_RESET_USR_PSW = ADM + '/reset-usr-psw';
export const ADM_GET_USR_LIST = ADM + '/get-usr-lst';
export const MNG = USER + '/mng';
export const MNG_GET_SP_LIST = MNG + '/get-sp-list';
export const SP = USER + '/salesperson';
export const SP_GET_CUSTOMER_LIST = SP + '/get-customer-list';
// ----CATEGORY
export const CATEGORY = ROOT + '/category';
export const CREATE_CATEGORY = CATEGORY + '/create';
export const UPDATE_CATEGORY = CATEGORY + '/update';
export const UPDATE_CATEGORY_STATUS = UPDATE_CATEGORY + '/status';
export const CATEGORY_DETAILS = CATEGORY + '/details';
// ----PRODUCT
export const PRODUCT = ROOT + '/product';
export const GET_PRODUCT_LIST_BY_CATEGORY =
  PRODUCT + '/get-product-list-by-cate';
export const CREATE_PRODUCT = PRODUCT + '/create';
export const UPDATE_PRODUCT = PRODUCT + '/update';
export const UPDATE_PRODUCT_STATUS = UPDATE_PRODUCT + '/status';
export const PRODUCT_DETAILS = PRODUCT + '/details';
// ----BILL
export const BILL = ROOT + '/bill';
export const CREATE_BILL = BILL + '/create';
export const GET_BILL_LIST_BY_CUSTOMER = BILL + '/get-bill-list-by-customer';
export const GET_BILL_LIST_BY_SALESPERSON =
  BILL + '/get-bill-list-by-salesperson';
export const CHANGE_BILL_STATUS = BILL + '/change-bill-status';
export const BILL_DETAILS = BILL + '/details';
// ----SESSION
export const SESSION = ROOT + '/session';
export const CHECK_SESSION = SESSION + '/check';

// ENV
export const JWT_CHARS = process.env.JWT_CHARS;
export const APP_PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
