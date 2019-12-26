import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cursor: {
            hovered: false,
            tooltip: ""
        },
    },
    mutations: {
        changeCursor(state, payload) {
            state.cursor = payload;
        }
    },
    actions: {
        SHOW_CURSOR({
            commit
        }, payload) {
            if (typeof payload == 'object') {
                commit('changeCursor', {
                    hovered: payload.hovered || false,
                    tooltip: !payload.hovered ? "" : payload.tooltip || ""
                })
            } else {
                commit('changeCursor', {
                    hovered: payload,
                    tooltip: ""
                })
            }
        }
    },
    getters: {
        cursor(state) {
            return state.cursor
        }
    }
})