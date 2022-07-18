import mongoose from 'mongoose'

const haikuSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  emoji: String
})

const Haikus = mongoose.model('Haikus', haikuSchema);

export default Haikus