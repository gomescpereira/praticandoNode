import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from '../entity/User';

     
export class UsersService {
  

  async create(name: string, email: string, password: string) {
     
     
     const _repository = getCustomRepository(UsersRepository);
   
     //const userExists = await _repository.findOne({
      // email
     //});

     // Se existir , retorna user
     //if(userExists) {
      
     //   return userExists
     //}
       
     // const user = await _repository.create(usuario);   
     const user = await _repository.create({
          name,
          email,
          password_hash: password
     });

     
           
     const usuario = await _repository.save(user);   

     
     return usuario;
        
  }

  async show() {
     
    const _repository = getCustomRepository(UsersRepository);
    const users = await _repository.find();
    
   return users;
         
  }

  async findEmail(email: string) {
     
    
     const _repository = getCustomRepository(UsersRepository);

     const user = await _repository.findOne({ where: {email }});

     
     return user;
         
  }
}


