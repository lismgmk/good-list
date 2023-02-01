import { IsEmail, IsOptional, Length } from 'class-validator';
import { FIELD_LENGTH_VALIDATION_ERROR } from '../../../consts/ad-validation-const';
import { ICreateUser } from './create-user.dto';

export class UpdateUserDto implements Omit<ICreateUser, 'password'> {
  @IsOptional()
  @Length(3, 10, { message: FIELD_LENGTH_VALIDATION_ERROR })
  readonly login: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;
}
