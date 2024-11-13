import { Router } from 'express'; 
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './App/middlewares/auth';

import UserController from './App/controllers/UserController';
import SessionController from './App/controllers/SessionController';
import ProductController from './App/controllers/ProductController';
import CategoryController from './App/controllers/CategoryController';
import OrderController from './App/controllers/OrderController';
import CreatePaymentIntentController from './App/controllers/stripe/CreatePaymentIntentController';


const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products',ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/categories',upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index); 
routes.put('/categories/:id', upload.single('file'), CategoryController.update);    

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);


export default routes;