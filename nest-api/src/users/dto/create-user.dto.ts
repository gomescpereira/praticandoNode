import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
//  @MaxLength(255)
//  @IsString()
//  @IsNotEmpty()
  name: string;

//  @IsString()
//  @IsNotEmpty()
  email: string;

//  @MaxLength(255)
//  @IsString()
//  @IsNotEmpty()
  password_hash: string;

}
