const getDefaultState = () => {
  return {
    statusList: {
      1: '正常',
      0: '异常',
      '-1': '未激活'
    },
    roleList: {
      'admin': '管理员',
      'shoper': '卖家',
      'buyer': '刷手'
    },
    taskStatusList: {
      1: '待接单',
      2: '待完成',
      3: '待确认',
      4: '待结算',
      5: '已结算',
      0: '异常'
    }
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
  }
}

const actions = {
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      resolve(data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

