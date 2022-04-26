import axios from "axios"

const state = ()=>({
    hp:[],
    cart:[],
    slug:"",
    brands:[],
    listHp:[]
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
   
    setSlug(state,params){
        state.slug= params
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
    fetchDataHp(store,slug){
        store.commit("setSlug",slug)
        console.log("Ini di dalam fetchDataHp")
        axios.get(`https://api-mobilespecs.azharimm.site/v2/brands/${store.state.slug}`)
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
  
   fetchDetailHp(store,slug){
        store.commit("setSlug",slug)
        axios.get(`https://api-mobilespecs.azharimm.site/v2/${store.state.slug}`)
        .then(
            (response)=>{
                console.log(response)
                store.commit("setDataHp",response)
            }
        )

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