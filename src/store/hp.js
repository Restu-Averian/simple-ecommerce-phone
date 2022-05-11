
const state = ()=>({
   
    UserLogin:""
})

const mutations={
    setUserLogin(state,params){
        state.UserLogin =params
    },
   
  
}
const actions = {
    setLogin(store,params){
        store.commit("setUserLogin",params)
    }
}

export default {
    state,
    mutations,
    actions
}