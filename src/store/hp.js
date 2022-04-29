
const state = ()=>({
    LikeOrNot:[],
    DislikeOrNot:[],
})

const mutations={
  
   setLike(state,param){
    state.LikeOrNot.push(param)
   },
   setDislike(state,param){
    state.DislikeOrNot.push(param)
   },
  
}
const actions = {
}

export default {
    state,
    mutations,
    actions
}