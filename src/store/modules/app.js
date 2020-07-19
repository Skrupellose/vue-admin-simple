import { login } from '@/api/login'
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  token: sessionStorage.getItem('token') || '',
  username: sessionStorage.getItem('username') || ''
}
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  SET_USER(state, username) {
    state.username = username
    sessionStorage.setItem('username', username)
  }
}
const actions = {
  Login({ commit }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        console.log(res)
        const token = res.data.token
        const username = res.data.username
        commit('SET_TOKEN', token)
        commit('SET_USER', username)
        resolve(res)
      }).catch(error => console.log(error))
    })

  }
}

const getters = {
  isCollapse: state => state.isCollapse
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}