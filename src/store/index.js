import Vue from 'vue'
import Vuex from 'vuex'
import hp from '@/store/hp'
import createPersistedData from 'vuex-persistedstate'
Vue.use(Vuex)
const persistedData = createPersistedData({
  // paths:['dataHp'],
  key:"dataHp"
})
export default new Vuex.Store({
  plugins:[persistedData],
  modules: {
    dataHp:{
      namespaced:false,
      ...hp
    },
    
    
  }
})
