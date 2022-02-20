export const state = () => ({
    auth: false,
    token: null,
})



export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    },
    setToken(state, token) {
        state.token = token
    }
}