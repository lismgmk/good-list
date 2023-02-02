import { BadRequestException, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FIELD_OBJECT_ID_VALIDATION_ERROR } from '../consts/ad-validation-const';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsLoginFormValidator implements ValidatorConstraintInterface {
  async validate(value: any) {
    const regex = /^@/;

    if (!regex.test(value)) {
      throw new BadRequestException({
        message: FIELD_OBJECT_ID_VALIDATION_ERROR,
      });
    } else {
      return true;
    }
  }
}

export function IsLoginForm(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsLoginForm',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsLoginFormValidator,
    });
  };
}
