import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import {
  FIELD_EMAIL_VALIDATION_ERROR,
  FIELD_LENGTH_VALIDATION_ERROR_LONG,
  FIELD_LENGTH_VALIDATION_ERROR_SHORT,
  FIELD_REQUIRED_VALIDATION_ERROR,
} from '../consts/ad-validation-const';

export interface IDeal {
  userId: Types.ObjectId;
  content: string;
  createdAt: string;
}

@Schema({ expires: 'deal' })
export class Deal extends Document implements IDeal {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
  })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
    min: [1, FIELD_LENGTH_VALIDATION_ERROR_SHORT],
    max: [1000, FIELD_LENGTH_VALIDATION_ERROR_LONG],
  })
  content: string;

  @Prop({
    type: String,
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
  })
  createdAt: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
