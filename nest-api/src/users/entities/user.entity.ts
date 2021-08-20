import { ObjectType, Field, ID } from "@nestjs/graphql";

import { v4 as uuidv4 } from "uuid";
import {  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'users' })
export class User {
 
 @PrimaryGeneratedColumn('uuid')
 @Field(() => ID)
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

}

