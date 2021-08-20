import { Request, Response } from 'express';
import { UsersService } from "../services/UsersService";


export class UsersController {
 
 async create(request: Request, response: Response): Promise<Response> {
  const { email } = request.body;

  
   const _services = new UsersService();

  
   try {
      const user = await _services.create(email);
      return response.json(user);
   } catch(err) {
      return response.status(400).json({ message: err.message });   
   }
 }

 async show(request: Request, response: Response): Promise<Response> {
 
    const _services = new UsersService();

    const users =  await _services.show();

    return response.json(users); 

 }

 
}

//export { UsersController };
