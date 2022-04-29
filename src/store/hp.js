
const state = ()=>({
    LikeOrNot:[],
    DislikeOrNot:[],
    UserLogin:""
})

const mutations={
    setUserLogin(state,params){
        state.UserLogin =params
    },
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