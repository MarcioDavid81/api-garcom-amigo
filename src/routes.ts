import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controlers/user/CreateUserController';
import { AuthUserController } from './controlers/user/AuthUserController';
import { DetailUserController } from './controlers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controlers/category/CreateCategoryController';
import { ListCategoryController } from './controlers/category/ListCategoryController';
import { CreateProductController } from './controlers/product/CreateProductController';
import uploadConfig from './config/multer';
import { ListByCategoryController } from './controlers/product/ListByCategoryController';
import { CreateOrderController } from './controlers/order/CreateOrderController';
import { RemoveOrderController } from './controlers/order/RemoveOrderController';
import { AddItemController } from './controlers/order/AddItemController';
import { RemoveItemController } from './controlers/order/RemoveItemController';
import { SendOrderController } from './controlers/order/SendOrderController';
import { ListOrdersController } from './controlers/order/ListOrdersController';
import { DetailOrderController } from './controlers/order/DetailOrderController';
import { FinishOrderController } from './controlers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Rotas Users
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);
    
router.get('/me', isAuthenticated, new DetailUserController().handle);

//Rotas Categories
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryController().handle);

//Rotas Products
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

//Rotas Orders
router.post('/order', isAuthenticated, new CreateOrderController().handle);

router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);

router.put('/order/send', isAuthenticated, new SendOrderController().handle);

router.get('/orders', isAuthenticated, new ListOrdersController().handle);

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };