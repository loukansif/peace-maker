import Users from '../models/user.js'

export async function getUsers(){
    const userList = await Users
      .find()
    
      return userList
}

export async function getOneUser(_id){
  const oneUser = await Users
    .findOne({_id: _id})

    return oneUser
}

export async function createUser(userData){
    
    const User = new Users(userData)
   
    const result = await User.save()
    
    return result
}