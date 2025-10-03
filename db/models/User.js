import db from '../index.js';

const userSchema = db.Schema({
  login: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = db.model('users', userSchema);

export default User;
