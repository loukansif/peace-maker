import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  admin: Boolean,
  lastname: String,
  firstname: String,
  email: String,
  password: String,
  totem: String
})

const User = mongoose.model('User', userSchema);

export default User