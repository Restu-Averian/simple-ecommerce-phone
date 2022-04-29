
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
    deleteCart(state,params){
        state.cart.splice(params,1)
    },
   
}
const actions = {
   
   
}

export default {
    state,
    mutations,
    actions
}