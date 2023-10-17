import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  photo: string;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, unique: true },
  email: { type: String, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  name: { type: String, match: /[A-Za-z]/ },
  photo: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
