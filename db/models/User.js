import db from '../index.js';

const userSchema = db.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'] /* enum permet de spécifier des valeurs accéptées */,
    default: 'user',
  },
});

const User = db.model('users', userSchema);

export default User;
