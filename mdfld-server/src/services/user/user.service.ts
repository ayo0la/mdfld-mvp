import mongoose from 'mongoose';
import Users, { UserDocuments } from '../../models/user.model';
import User from '../../models/user.model';

class UserService {
  static async findByEmail(email: string) {
    return Users.findOne({ email });
  }

  static async findById(id: mongoose.Types.ObjectId) {
    return Users.findById(id);
  }

  static async updateParticipants(
    userId: mongoose.Types.ObjectId,
    participantId: mongoose.Types.ObjectId
  ): Promise<UserDocuments | null> {
    return await User.findByIdAndUpdate(userId, { $addToSet: { participants: participantId } }, { new: true });
  }
}

export default UserService;
