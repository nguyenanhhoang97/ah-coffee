import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { UserController } from '../controllers/UserController';
import { CategoryController } from '../controllers/CategoryController';
import { ProductController } from '../controllers/ProductController';
import { SessionController } from '../controllers/SessionController';
import {
  ROOT,
  USER_REGISTER,
  USER_LOGIN,
  USER_UPDATE_PROFILE,
  USER_UPDATE_PSW,
  ADM_UPDATE_USR_INFO,
  ADM_RESET_USR_PSW,
  ADM_GET_USR_LIST,
  MNG_GET_SP_LIST,
  SP_GET_CUSTOMER_LIST,
  CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_STATUS,
  CATEGORY_DETAILS,
  PRODUCT,
  GET_PRODUCT_LIST_BY_CATEGORY,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  CHECK_SESSION
} from '../core/constant';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.split(' ').join('_'));
  }
});
const upload = multer({ storage });

export class Routes {
  public userController: UserController = new UserController();
  public categoryController: CategoryController = new CategoryController();
  public productController: ProductController = new ProductController();
  public sessionContrller: SessionController = new SessionController();

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
    app.route(USER_UPDATE_PSW).post(this.userController.changePassword);
    app
      .route(ADM_UPDATE_USR_INFO)
      .post(upload.any(), this.userController.admUpdateUserInfo);
    app.route(ADM_RESET_USR_PSW).get(this.userController.admResetUserPsw);
    app.route(ADM_GET_USR_LIST).get(this.userController.admGetUserList);
    app.route(MNG_GET_SP_LIST).get(this.userController.getSalespersonList);
    app.route(SP_GET_CUSTOMER_LIST).get(this.userController.getCustomerList);

    // Category
    app.route(CATEGORY).get(this.categoryController.getCategoryList);
    app
      .route(CREATE_CATEGORY)
      .post(upload.any(), this.categoryController.createCategory);
    app
      .route(UPDATE_CATEGORY)
      .post(upload.any(), this.categoryController.updateCategoryById);
    app
      .route(UPDATE_CATEGORY_STATUS)
      .post(this.categoryController.changeCategoryStatus);
    app.route(CATEGORY_DETAILS).get(this.categoryController.getCategoryDetail);

    // Product
    app
      .route(CREATE_PRODUCT)
      .post(upload.any(), this.productController.createProduct);
    app
      .route(UPDATE_PRODUCT)
      .post(upload.any(), this.productController.updateProductById);
    app
      .route(UPDATE_PRODUCT_STATUS)
      .post(this.productController.changeProductStatus);
    app.route(PRODUCT).get(this.productController.getProductList);
    app
      .route(GET_PRODUCT_LIST_BY_CATEGORY)
      .get(this.productController.getProductListByCategoryId);

    // Session
    app.route(CHECK_SESSION).get(this.sessionContrller.getSessionStatus);
  }
}
