import { IsEmail, Length } from 'class-validator';
import { FIELD_LENGTH_VALIDATION_ERROR } from '../../../consts/ad-validation-const';

export interface ICreateUser {
  login: string;
  email: string;
  password: string;
}

export class CreateUserDto implements ICreateUser {
  @Length(3, 10, { message: FIELD_LENGTH_VALIDATION_ERROR })
  readonly login: string;

  @Length(6, 20, { message: FIELD_LENGTH_VALIDATION_ERROR })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
