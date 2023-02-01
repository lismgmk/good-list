import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray } from 'class-validator';
import { Document } from 'mongoose';
import {
  FIELD_EMAIL_VALIDATION_ERROR,
  FIELD_LENGTH_VALIDATION_ERROR_LONG,
  FIELD_LENGTH_VALIDATION_ERROR_SHORT,
  FIELD_REQUIRED_VALIDATION_ERROR,
} from '../consts/ad-validation-const';

export interface IUser {
  login: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  friends: string[];
}

@Schema({ expires: 'user' })
export class User extends Document implements IUser {
  @Prop({
    type: String,
    required: true,
    min: [3, FIELD_LENGTH_VALIDATION_ERROR_SHORT],
    max: [10, FIELD_LENGTH_VALIDATION_ERROR_LONG],
  })
  login: string;

  @Prop({
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
    validate: {
      validator: async function (v: string) {
        return v
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
      },
      message: (props) => `${props.value} ${FIELD_EMAIL_VALIDATION_ERROR}`,
    },
  })
  email: string;

  @Prop({
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
    min: [6, FIELD_LENGTH_VALIDATION_ERROR_SHORT],
    max: [20, FIELD_LENGTH_VALIDATION_ERROR_LONG],
  })
  passwordHash: string;
  @Prop({
    type: String,
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
  })
  createdAt: string;

  @Prop({ required: false, default: [] })
  @IsArray()
  friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
