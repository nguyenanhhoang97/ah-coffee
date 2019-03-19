import { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import { CategoryController } from '../controllers/CategoryController';

export const ROOT = '/api/v1';
export const USER = ROOT + '/user';
export const USER_REGISTER = USER + '/register';
export const USER_LOGIN = USER + '/login';
export const USER_UPDATE_PROFILE = USER + '/update-profile';
export const CATEGORY = ROOT + '/category';
export const CREATE_CATEGORY = CATEGORY + '/create';

export class Routes {
  public userController: UserController = new UserController();
  public categoryController: CategoryController = new CategoryController();

  public routes(app: any): void {
    app.route(ROOT).get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'Coffee Shop API by Nguyen Anh Hoang'
      });
    });

    // User
    app.route(USER_REGISTER).post(this.userController.registerUser);
    app.route(USER_LOGIN).post(this.userController.userLogin);
    app.route(USER_UPDATE_PROFILE).post(this.userController.updateUserInfo);

    // Category
    app.route(CATEGORY).get(this.categoryController.getCategoryList);
    app.route(CREATE_CATEGORY).post(this.categoryController.createCategory);
  }
}
