import { login, getInfo, registry } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userObj: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.userObj = user
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        if (res.code === 200) {
          commit('SET_TOKEN', 'Bearer ' + res.token)
          setToken('Bearer ' + res.token)
          resolve()
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user registry
  registry({ commit }, userInfo) {
    const { username, password, role, country } = userInfo
    return new Promise((resolve, reject) => {
      registry({ username: username.trim(), password: password, role, country }).then(res => {
        if (res.code === 200) {
          // commit('SET_TOKEN', 'Bearer ' + res.token)
          // setToken('Bearer ' + res.token)
          resolve()
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (res.code === 200) {
          const { roles, username, avatar } = res.data
          commit('SET_ROLES', [roles])
          commit('SET_NAME', username)
          commit('SET_USER', res.data)
          commit('SET_AVATAR', avatar)
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

