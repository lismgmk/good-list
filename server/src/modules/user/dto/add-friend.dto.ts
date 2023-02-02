import { Length } from 'class-validator';
import { FIELD_LENGTH_VALIDATION_ERROR } from '../../../consts/ad-validation-const';
import { IsLoginForm } from '../../../dto-validator/is-login-formj';

export class AddFriendDto {
  @IsLoginForm()
  @Length(3, 15, { message: FIELD_LENGTH_VALIDATION_ERROR })
  readonly login: string;
}
