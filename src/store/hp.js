
const state = ()=>({
   
    UserLogin:""
})

const mutations={
    setUserLogin(state,params){
        state.UserLogin =params
    },
    updateProvinsi(state,params){
     state.UserLogin["provinsi"]=params
    },
   updateKota(state,params){
    state.UserLogin["kota"]=params
   },
   updateKecamatan(state,params){
    state.UserLogin["kecamatan"]=params
   },
   updateKelurahan(state,params){
    state.UserLogin["kelurahan"]=params
   },
  
}
const actions = {
    setLogin(store,params){
        store.commit("setUserLogin",params)
    },
    updateProvinsi(store,params){
        store.commit("updateProvinsi",params)
    },
    updateKota(store,params){
        store.commit("updateKota",params)
    },
    updateKecamatan(store,params){
        store.commit("updateKecamatan",params)
    },
    updateKelurahan(store,params){
        store.commit("updateKelurahan",params)
    },
}

export default {
    state,
    mutations,
    actions
}