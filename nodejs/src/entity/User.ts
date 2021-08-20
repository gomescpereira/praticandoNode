import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
 
import {  AfterInsert,BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
 
 @PrimaryGeneratedColumn('uuid')
 id: string;
 
 @Column()
 name: string;

 @Column()
 email: string;

 @Column()
 password_hash: string;
  
 @CreateDateColumn()
 created_at: Date;

 @BeforeInsert()
 generateId() {
   if (this.id) {
      return;
    }
    this.id = uuidv4();
 }


 
 @BeforeInsert()
 async updatepassword()
 {  
       if(this.password_hash.length > 10) return;
      this.password_hash = await bcrypt.hash(this.password_hash, 8);         
     
 }

 public async getcheckPassword(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password_hash); 
 }

 public async getgenerateToken() {
  return await jwt.sign({id: this.id }, process.env.APP_SECRET);
        
 }
   
 
}


     
  
  



