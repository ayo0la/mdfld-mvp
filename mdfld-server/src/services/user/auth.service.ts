import Users from '../../models/user.model';
import { TLOGIN, TREGISTER } from '../../types/user';
import S3Service from '../s3.service';
import UserService from './user.service';
import bcrypt from 'bcrypt';

class AuthService extends UserService {
  // user registration
  static async register(userData: TREGISTER, image: Express.Multer.File) {
    const hash = await bcrypt.hash(userData.password, 10);

    const uploadedImageUrl = await S3Service.uploadFileS3(image);
    return Users.findOneAndUpdate(
      { email: userData.email },
      {
        $set: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: hash,
          role: userData.role,
          participants: [],
          image: uploadedImageUrl,
        },
        $unset: { delete_user: '' },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  static async validateUserRegistration(email: string) {
    return Users.updateOne({ email }, { verified: true });
  }

  static async login({ email, password }: TLOGIN) {
    const user = await this.findByEmail(email);
    if (!user || !user?.verified) {
      return false;
    }
    const validUser = await user.isValidPassword(password);
    if (!validUser) {
      return false;
    }
    return true;
  }
}

export default AuthService;
