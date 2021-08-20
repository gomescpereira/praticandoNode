import { InputType } from "@nestjs/graphql";

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional
} from 'class-validator';


@InputType()
export class UpdateUserInput {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
// Informa que é opcional
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password_hash?: string;

}
