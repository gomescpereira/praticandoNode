import "reflect-metadata";
import express from "express";
import  routes   from './routes';
import * as dotenv from 'dotenv';


// Para uso em Multiplos ambientes
//import {config as configDotenv} from 'dotenv'
//import {resolve} from 'path'

//switch(process.env.NODE_ENV) {
//  case "development":
//   console.log("Environment is 'development - SRC'")
//    configDotenv({
//      path: resolve(__dirname, "../.env")
//    })
//    break
//  case "test":
 //   console.log("Environment is 'TESTE - SRC")
//    configDotenv({
//      path: resolve(__dirname, "../.env.test")
//    })
//    break
//  // Add 'staging' and 'production' cases here as well!
//  default:
//    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
//}




dotenv.config({
path: process.env.NODE_ENV === 'test' ? __dirname + '../.env.test' : __dirname + '../.env'
});

console.log(process.env.NODE_ENV);


class App {
  public express: express.Application;

  constructor(){
     this.express = express();

     this.middlewares();
     this.routes();
     
  }

  
  public routes(): void  {
     this.express.use(routes);
  }

  private middlewares(): void {
   this.express.use(express.json());
  }
}

export default new App().express;







