import { v4 as uuidv4 } from "uuid";

import {  AfterInsert,BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn } from "typeorm";

//@Entity({ name: 'entregas' })
export class Destinatario {
 
 
 @Column()
 nome: string

 @Column()
 logradouro: string;

 @Column()
 numero: string;
 
 @Column()
 complemento: string 

 @Column()
 bairro: string;

   
 
}


     
  
  



