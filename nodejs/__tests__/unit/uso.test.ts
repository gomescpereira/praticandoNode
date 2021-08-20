//import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
//import "../../scr/database"; 
import { User } from '../../src/entity/User';
import { UsersService }  from '../../src/services/UsersService';


import bcrypt  from 'bcryptjs';

describe('Teste', () => {
   it('should sum does numbers', () => {
       const x = 2;
       const y = 4;
       const sum = x + y;

      expect(sum).toBe(6); 
   });
});


describe('Authentication', () => {
    
   beforeAll(async () => {

      await createConnection();
   });

   it('should return email user', async () => {
       
    
    const name = "Diego";
    const email = "diego@rocketseat.com.br";
    const password = "123123"; 

    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);
    console.log("Saved a new user with id: ", usuario.id);
     
    
            
        
//     Não pode comparar porque cada vez um hash vai ter um valor diferente
//     const hash = await bcrypt.hash("123123", 8); 
//     console.log(hash);

     expect(await bcrypt.compare('123123',usuario.password_hash)).toBe(true); 
     expect(usuario.email).toBe('diego@rocketseat.com.br'); 

   });


   afterAll(async () => {
      const defaultConnection = getConnection('default');
      await defaultConnection.close();  
     
   });


});
