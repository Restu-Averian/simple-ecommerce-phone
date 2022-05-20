
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
   updateUsername(state,params){
       state.UserLogin["username"]=params
   },
   updatePassword(state,params){
       state.UserLogin["password"]=params
   },
   updatePhotoProfile(state,params){
       state.UserLogin["photo_profile"]=params
   },
   updateNoHp(state,params){
       state.UserLogin["no_hp"]=params
   },
  
}
const actions = {
    setLogin(store,params){
        store.commit("setUserLogin",params)
    },
    updateUsername(store,params){
        store.commit("updateUsername",params)
    },
    updatePassword(store,params){
        store.commit("updatePassword",params)
    },
    updateNoHp(store,params){
        store.commit("updateNoHp",params)
    },
    updatePhotoProfile(store,params){
        store.commit("updatePhotoProfile",params)
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