import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver('Use')
export class UsersResolver {

  constructor(
       private usersService: UsersService
  ){}

  @Query(() => [User])
  async users(): Promise<User[]> {
   const users = await this.usersService.findAll();
   return users;
  }

  @Query(() => User)
  async user(
     @Args('id') id:string
   ): Promise<User> {
   const user = await this.usersService.findOne(id);
   return user;
  }  

  @Mutation(() => User)
  async createUser(
      @Args('data') data: CreateUserInput
  ): Promise<User> {
      const user = await this.usersService.createUserGraphql(data);     
      return user; 
  }

  @Mutation(() => User)
  async updateUser(
      @Args('id') id: string,
      @Args('data') data: UpdateUserInput
  ): Promise<User> {
      const user = await this.usersService.updateUserGraphql(id,data);     
      return user; 
  } 
  
  @Mutation(() => Boolean)
  async deleteUser(
      @Args('id') id: string      
  ): Promise<boolean> {
      const deleted = await this.usersService.remove(id);     
      return deleted; 
  } 

 
}
