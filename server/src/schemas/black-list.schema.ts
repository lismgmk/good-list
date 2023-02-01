import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FIELD_REQUIRED_VALIDATION_ERROR } from '../consts/ad-validation-const';

export interface IBlackList {
  tokenValue: string;
}

@Schema({ expires: 'blackList' })
export class BlackList extends Document implements IBlackList {
  @Prop({
    type: String,
    required: [true, FIELD_REQUIRED_VALIDATION_ERROR],
  })
  tokenValue: string;
}

export const BlackListSchema = SchemaFactory.createForClass(BlackList);
