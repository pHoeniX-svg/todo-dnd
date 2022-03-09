import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'please enter a username'],
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', schema);

export { User };
