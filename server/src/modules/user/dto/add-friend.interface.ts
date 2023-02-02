import { Types } from 'mongoose';

export interface ICondition {
  [key: string]: Types.ObjectId[] | any;
}
export interface IAddFriend {
  userId: string;
  friendLogin?: string;
  friendId?: string;
}
