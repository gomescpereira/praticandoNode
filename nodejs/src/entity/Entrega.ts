import { v4 as uuidv4 } from "uuid";
import  StatusEntrega  from "../model/statusEntrega";
import { User }  from './User';
import { Destinatario }  from './Destinatario' ;
import {  AfterInsert,BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'entregas' })
export class Entrega {
 
 @PrimaryGeneratedColumn('uuid')
 id: string;
 
 @Column()
 name: string;

 @Column()
 destinario: string;

 @Column()
 taxa: number;
 
 @Column()
 status: string; 


 @CreateDateColumn()
 dataPedido: Date;

 @CreateDateColumn()
 dataFinalizacao: Date;

 @CreateDateColumn()
 created_at: Date;


 @BeforeInsert()
 generateId() {
   if (this.id) {
      return;
    }
    this.id = uuidv4();
 }
  
 
}


     
  
  



