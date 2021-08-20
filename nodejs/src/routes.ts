import { Router } from 'express';
import { User } from "./entity/User";
import  SessionController  from './controllers/SessionController';
import authMiddleware from './middleware/auth';

const routes = Router();
   


routes.post('/sessions', SessionController.store);

routes.get('/sessions', SessionController.show);

routes.use(authMiddleware);
routes.get('/dashboard', (req,res) => {
  return res.status(200).send();
});


export default routes;
