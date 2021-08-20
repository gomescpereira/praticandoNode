import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInput } from './dto/update-user.input';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}


  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    const userSaved =  await this.userRepo.save(user);
    if(!userSaved) {
     throw new InternalServerErrorException('Problem to create a user. Try again');

    }
    return userSaved;
  }

  async createUserGraphql(createUserInput: CreateUserInput) {
    const user = this.userRepo.create(createUserInput);
    const userSaved =  await this.userRepo.save(user);
    if(!userSaved) {
     throw new InternalServerErrorException('Problem to create a user. Try again');

    }
    return userSaved;
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id);

    if(!user)  {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async update(id: string, updateUserDto: UpdateUserDto)  {
    const user = await this.findOne(id);  

          
    const updateResult = await this.userRepo.update(user, updateUserDto);


    if (!updateResult.affected) {
      throw new EntityNotFoundError(UpdateUserDto, id);
    }
    return this.userRepo.findOne(id);
  }

  async updateUserGraphql(id: string, data: UpdateUserInput)  {
    const user = await this.findOne(id);  

          
    const updateResult = await this.userRepo.update(user, { ...data});
    console.log(updateResult, data);

    if (!updateResult.affected) {
         throw new EntityNotFoundError(UpdateUserInput, id);
    }

    // Junta os dados de user com data
    const userUpdated = this.userRepo.create({ ...user, ...data});

    console.log(userUpdated);

    if (!userUpdated) {
      throw new EntityNotFoundError(UpdateUserInput, id);
    }

    return userUpdated;
  }

  async remove(id: string): Promise<boolean> {

    const user = await this.findOne(id);  

    const deleteResult = await this.userRepo.delete(user);

    if (!deleteResult) {
      return false;
      //throw new EntityNotFoundError(User, id);
    }

    return true;
  }

}
