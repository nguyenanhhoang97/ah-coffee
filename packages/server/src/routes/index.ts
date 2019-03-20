import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { UserController } from '../controllers/UserController';
import { CategoryController } from '../controllers/CategoryController';
import {
  ROOT,
  USER,
  USER_REGISTER,
  USER_LOGIN,
  USER_UPDATE_PROFILE,
  CATEGORY,
  CREATE_CATEGORY
} from '../core/constant';

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname.split(' ').join('_'));
  }
});
let upload = multer({ storage });

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
    app
      .route(USER_UPDATE_PROFILE)
      .post(upload.any(), this.userController.updateUserInfo);

    // Category
    app.route(CATEGORY).get(this.categoryController.getCategoryList);
    app
      .route(CREATE_CATEGORY)
      .post(upload.any(), this.categoryController.createCategory);
  }
}
