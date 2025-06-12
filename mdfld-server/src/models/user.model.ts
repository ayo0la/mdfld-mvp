import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { LOGIN_METHOD } from '../constants/user.constant';

export const ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
};

mongoose.set('strictQuery', false);

export interface UserDocuments extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  login_method: string;
  first_name: string;
  last_name: string;
  participants: mongoose.Types.ObjectId[];
  image: string;
  isValidPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocuments>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  login_method: {
    type: String,
    default: LOGIN_METHOD.NORMAL,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'User',
    default: [],
  },
  role: {
    type: String,
  },
  image: {
    type: String,
  },
});

userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model<UserDocuments>('User', userSchema);

export default User;
