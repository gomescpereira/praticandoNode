import {createConnection, getConnection} from "typeorm";

import { User } from '../../src/entity/User';
import request from 'supertest';
import  app  from "../../src/app";
import { UsersService }  from '../../src/services/UsersService';
import factory from '../factories';
import faker from 'faker';

//import bcrypt  from 'bcryptjs';

describe('Authentication', () => {

  beforeAll(async () => {
      await createConnection();
  });

  it("should authenticate with valid credentials", async () => {
       
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = "123123"

    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);
    
    const result = await request(app)
      .post("/sessions")
      .send({
          email: email,
          password: "123123"
      }); 	

     expect(result.status).toBe(200); 
    
  });

  it("should not authenticate with invalid credentials", async () => {
     
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    
    //const name = "Diego";
    //const email = "diego@rocketseat.com.br";


    //const user = await factory.create('User', {
    //     password: '123123'   
    //});

    //console.log(user);
  
    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);

     
    const response = await request(app)
      .post("/sessions")
      .send({
          email: email,
          password: "123123"
      }); 	
       

     //console.log(response.body);
    
     expect(response.status).toBe(401); 
    
  });

  it("should return jwt token when authenticate", async () => {

    const name = faker.name.findName();
    const email = faker.internet.email();
    
    //const name = "Diego";
    //const email = "diego@rocketseat.com.br";
    const password = "123123";

    //const user = await factory.create('User', {
    //     password: '123123'   
    //});

  
    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);

     
    const response = await request(app)
      .post("/sessions")
      .send({
          email: email,
          password: "123123"
      }); 	

     //console.log(response.body);
    
     expect(response.body).toHaveProperty("token"); 


  });

 
  it("should be able to access private routes when authenticate", async () => {

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = "123123";

         
    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);

     
    const response = await request(app)
      .get("/dashboard")
      .set('Authorization', `Bearer ${ await usuario.getgenerateToken()}`);

     //console.log(response.body);
    
     expect(response.status).toBe(200); 


  });


    it("should not be able to access private routes without jwt token", async () => {

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = "123123";

    
    //console.log(user);
  
    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);

     
    const response = await request(app)
      .get("/dashboard");
      

     //console.log(response.body);
    
     expect(response.status).toBe(401); 


  });

  it("should not be able to access private routes with invalid jwt token", async () => {

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = "123123";

    
    //console.log(user);
  
    const userService = new UsersService(); 
    const usuario = await userService.create(name,email,password);

     
    const response = await request(app)
    .get("/dashboard")
    .set('Authorization', `Bearer 123123`);

      

     //console.log(response.body);
    
     expect(response.status).toBe(401); 


  });
 
  afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();  
     
  });

});
