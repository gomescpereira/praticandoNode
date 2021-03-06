
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/users/schema.gql'),
    }),  
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
