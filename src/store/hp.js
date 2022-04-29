import axios from "axios"

const state = ()=>({
    hp:[],
    cart:[],
    slugListHp:"",
    slugDetailHp:"",
    brands:[],
    listHp:[],
    LikeOrNot:[],
    DislikeOrNot:[],
})

const mutations={
    setDataHp(state,params){
        state.hp = params
    },
    setListHp(state,params){
        state.listHp = params
    },
    setDataCart(state,params){
        state.cart.push(params)
    },

   setLike(state,param){
    state.LikeOrNot.push(param)
   },
   setDislike(state,param){
    state.DislikeOrNot.push(param)
   },


    
    setListSlug(state,params){
        state.slugListHp= params
    },
    setDetailSlug(state,params){
        state.slugDetailHp= params
    },
    deleteCart(state,params){
        state.cart.splice(params,1)
    },
    setBrands(state,params){
        state.brands = params
    }
}
const actions = {
   
    fetchBrands(store){
        axios.get("https://api-mobilespecs.azharimm.site/v2/brands")
        .then(
            (response)=>{
                store.commit("setBrands",response)
            }
        )  
    },
    fetchDataHp(store){
        console.log("Ini di dalam fetchDataHp")
        axios.get(`https://api-mobilespecs.azharimm.site/v2/brands/${store.state.slugListHp}`)
        .then(
            (response)=>{
                store.commit("setListHp",response)
            }
        )
        .catch(
            (error)=>{
                console.log("Error : ",error)
            }
        )
    },
  updateDataHp(store,params){
    store.commit("setListSlug",params)
    store.dispatch("fetchDataHp")
  },
   fetchDetailHp(store){
    console.log("Ini di dalam fetchDetailHp")
        axios.get(`https://api-mobilespecs.azharimm.site/v2/${store.state.slugDetailHp}`)
        .then(
            (response)=>{
                console.log(response)
                store.commit("setDataHp",response)
            }
        )

   },

    updateDetailHp(store,params){
        store.commit("setDetailSlug",params)
        store.dispatch("fetchDetailHp")
    },


    InputIntoCart(store,payload){
        store.commit("setDataCart",payload)
     },
     deleteCart(store,params){
        store.commit("deleteCart",params)
     }
    
}

export default {
    state,
    mutations,
    actions
}