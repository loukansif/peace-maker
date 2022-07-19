import mongoose from 'mongoose'

const haikuSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  line3: String,
  emoji: String,
  createdAt: String,
  reactions: Object,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Haikus = mongoose.model('Haikus', haikuSchema);

export default Haikus