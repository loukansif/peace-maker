import User from '../models/user.js'

export async function getUsers(){
    const userList = await User
      .find()
    
      return userList
}

export async function getOneUser(email){
  const oneUser = await User
    .findOne({email: email})

    return oneUser
}
export async function getOneUserById(id){
  const oneUser = await User
    .findOne({_id: id})

    return oneUser
}

export async function createUser(userData){
    
    const user = new User(userData)   
    const result = await user.save()
    
    return result
}

export async function updateUser(email, body) {
  return await User.findOneAndUpdate({email: email}, {...body})
}