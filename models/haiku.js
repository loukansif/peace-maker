import mongoose from 'mongoose'

const haikuSchema = new mongoose.Schema({
  userId: String,
  text: String,
  emoji: String
})

const Haikus = mongoose.model('Haikus', haikuSchema);

export default Haikus