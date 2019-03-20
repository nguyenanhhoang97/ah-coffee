import dotenv from 'dotenv';

dotenv.load();

// ROUTES
// ----ROOT
export const ROOT = '/api/v1';
// ----USER
export const USER = ROOT + '/user';
export const USER_REGISTER = USER + '/register';
export const USER_LOGIN = USER + '/login';
export const USER_UPDATE_PROFILE = USER + '/update-profile';
// ----CATEGORY
export const CATEGORY = ROOT + '/category';
export const CREATE_CATEGORY = CATEGORY + '/create';


// ENV
export const JWT_CHARS = process.env.JWT_CHARS;
export const APP_PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
