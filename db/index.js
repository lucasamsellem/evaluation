import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongo_url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/evaluation';

mongoose.connect(mongo_url).then(() => {
  console.log('Connected to evaluation DB');
});

export default mongoose;
