import dotenv from 'dotenv';

dotenv.load();

// ROUTES
export const ROOT = '/api/v1';
export const USER = ROOT + '/user';
export const USER_REGISTER = USER + '/register';
export const USER_LOGIN = USER + '/login';
export const USER_UPDATE_PROFILE = USER + '/update-profile';
export const CATEGORY = ROOT + '/category';
export const CREATE_CATEGORY = CATEGORY + '/create';
export const GENERAL = ROOT + '/general';
export const CONVERT_BASE64_TO_IMG = GENERAL + '/convert-base64-to-img';

// ENV
export const JWT_CHARS = process.env.JWT_CHARS;
export const APP_PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
