import { Length } from 'class-validator';
import { FIELD_LENGTH_VALIDATION_ERROR } from '../../../consts/ad-validation-const';

export interface IContent {
  content: string;
}

export class DealContentDto implements IContent {
  @Length(3, 1000, { message: FIELD_LENGTH_VALIDATION_ERROR })
  readonly content: string;
}
