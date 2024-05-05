export const state = () => ({
  stats: {
    users: 0,
    stores: 0,
    products: 0,
  },
  env: {},
  drawer: null,
  pinned: false,
})

export const mutations = {
  setStats(state, value) {
    state.stats = value
  },
  env(state, value) {
    state.env = value
  },
  drawer(state, value) {
    state.drawer = value
  },
  pinned(state, value) {
    state.pinned = value
  },
}
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, $axios }) {
    await dispatch("loadEnv", { env: this.$config, req })
  },
  loadEnv({ commit }, { env, req }) {
    commit("env", {
      URL: env.URL,
    })
  },
  syncStats({ commit, dispatch }, alwaysRun = true) {
    this.$axios.get("/crud/stats").then((resp) => commit("setStats", resp.data))
    if (alwaysRun) {
      setTimeout(() => {
        dispatch("syncStats")
      }, 60000)
    }
  },
  setDrawer({ commit }, value) {
    commit("drawer", value)
  },
  setPinned({ commit }, value) {
    commit("pinned", value)
  },
}

export const getters = {
  apiURL({ env }) {
    return env.URL
  },
  drawer({ drawer }) {
    return drawer
  },
  pinned({ pinned }) {
    return pinned
  },
}
