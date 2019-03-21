import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { UserController } from '../controllers/UserController';
import { CategoryController } from '../controllers/CategoryController';
import { ProductController } from '../controllers/ProductController';
import {
  ROOT,
  USER_REGISTER,
  USER_LOGIN,
  USER_UPDATE_PROFILE,
  CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_STATUS,
  CATEGORY_DETAILS,
  PRODUCT,
  GET_PRODUCT_LIST_BY_CATEGORY,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_STATUS
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
  }
}
