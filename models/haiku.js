import mongoose from 'mongoose'

const haikuSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  line3: String,
  createdAt: String,
  reactionss: Array,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalVote: Number
})

const Haikus = mongoose.model('Haikus', haikuSchema);

export default Haikus