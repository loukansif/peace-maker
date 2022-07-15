import Users from '../models/user.js'

export async function getUsers(){
    const userList = await Users
      .find()
    
      return userList
}

export async function getOneUser(email){
  const oneUser = await Users
    .findOne({email: email})

    return oneUser
}

export async function createUser(userData){
    
    const User = new Users(userData)
   
    const result = await User.save()
    
    return result
}