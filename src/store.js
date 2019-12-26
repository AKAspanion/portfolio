import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        darkTheme: false,
        isHovered: false,
        hoverTooltip: ""
    },
    mutations: {
        toggleTheme(state, payload) {
            state.darkTheme = payload;
        }
    },
    actions: {
        TOGGLE_THEME({
            commit
        }, payload) {
            commit('toggleTheme', payload)
        }
    },
    getters: {
        loadTheme(state) {
            return state.darkTheme
        }
    }
})