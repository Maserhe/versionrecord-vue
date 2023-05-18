import { createStore } from 'vuex'
import storage from './storage'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      token: "",
      username: ""
    }
  },
  mutations: {
    setToken(state,token) {
      state.token = token;
      storage.set('token', token);
    },
    delToken(state) {
      state.token = "";
      storage.remove("token");
    },

    // 可选
    setUserInfo(state, username) {
      state.username = username;
      storage.set('username', username);
    }

  },

  getters: {
    getToken(state){
      return state.token || storage.get("token") || "";
    },

    getUsername(state){
      return state.username || storage.get("username") || "";
    }
  },

})

export default store