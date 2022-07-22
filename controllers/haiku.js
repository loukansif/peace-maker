import Haikus from '../models/haiku.js'


// function de récupération de  tous les Haikus
export async function getHaikus(){
    const haikuList = await Haikus
      .find()
      .sort({'createdAt': "desc"})
      .populate('user')

      return haikuList
}

// function de récupération de  tous les Haikus ordered par vote
export async function getHaikusOrdered(){
  const haikuList = await Haikus
    .find()
    .sort({'totalVote': "desc"})
    .populate('user')

    return haikuList
}

// function de récupération des Haikus ordonnés par vote
// export async function getHaikusOrdered(){
//   const haikuList = await Haikus
//     .find()
//     // .aggregate([
//     //   {
//     //     $project: {
//     //       reduced: {
//     //         $reduce: {
//     //           input: "$reactionss", 
//     //           initialValue: 0,
//     //           in: {
//     //             $sum: [
//     //               "$$value",
//     //               "$$this"
//     //             ]
//     //           }
//     //         }
//     //       }
//     //     }
//     //   }
//     // ])
//     .populate('user')

//     let listSum = []

//     function order(x, y) {
//       let a = x.reactionss
//       let b = y.reactionss
//       return a < b ? -1 : (a > b ? 1 : 0);
//     }

//     let haikuListOrdered = haikuList.map((item) => { 
//       let initialValue = 0;
//       let sum = item.reactionss.forEach((el) => { initialValue += el })
//       console.log('test :',sum)
//      }).sort(order);
     
//     console.log(haikuListOrdered)
    

//     return haikuListOrdered
// }

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


export async function updateHaiku(_id, body) {
  return await Haikus.findOneAndUpdate({_id: _id}, {...body})
}

