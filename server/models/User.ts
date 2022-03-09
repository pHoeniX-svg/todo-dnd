import mongoose from 'mongoose';
import { IUser } from '~server/types';

const { Schema } = mongoose;

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },
    roles: [
      {
        type: Number,
        default: 1358,
      },
      { type: Number },
    ],
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>('User', schema);

export { UserModel };
