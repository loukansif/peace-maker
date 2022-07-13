import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  admin: Boolean,
  lastname: String,
  firstname: String,
  email: String,
  password: String,
  emoji: String
})

const Users = mongoose.model('Users', userSchema);

export default Users