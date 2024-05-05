export default ({ store, $axios, $config, req }) => {
  store.dispatch("loadEnv", { env: $config, req })
  $axios.defaults.baseURL = store.getters.apiURL
}
