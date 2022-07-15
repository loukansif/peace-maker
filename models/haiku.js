import mongoose from 'mongoose'

const haikuSchema = new mongoose.Schema({
  userId: String,
  line1: String,
  line2: String,
  line3: String,
  emoji: String,
  createdAt: String,
  reactions: Array
})

const Haikus = mongoose.model('Haikus', haikuSchema);

export default Haikus