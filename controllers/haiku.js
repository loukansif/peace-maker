import Haikus from '../models/haiku.js'


// function de récupération de  tous les Haikus
export async function getHaikus(){
    const haikuList = await Haikus
      .find()
      .populate('user')
      return haikuList
}

// function de récupération d'un seul Haiku par son id
export async function getOneHaiku(id){
  const oneHaiku = await Haikus
    .findOne({_id: id})

    return oneHaiku
}


// function de création d'un haiku
export async function createHaiku(haikuData){
    
    const haiku = new Haikus(haikuData)
   
    const result = await haiku.save()
    
    return result
}


// function modification d'un Haiku (reaction)
export async function updateHaiku(_id, body) {
  console.log(body)
  return await Haikus.findOneAndUpdate({_id : _id}, {...body})
}
