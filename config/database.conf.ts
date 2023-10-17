import mongoose from 'mongoose';

class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_ENPOINT);
      console.log('Connection to MongoDB successfully!');
    } catch (e) {
      console.log('Connection to MongoDB failed: ' + e);
    }
  }
}

Database.connect();
