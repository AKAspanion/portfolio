import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cursor: {
            hovered: false,
            tooltip: ""
        },
        navMenu: false,
        socialLinks: [{
                id: 1,
                name: 'Github',
                url: 'https://github.com/AKAspanion'
            },
            {
                id: 2,
                name: 'Linkedin',
                url: 'https://www.linkedin.com/in/spanion',
            },
            {
                id: 3,
                name: 'Instagram',
                url: 'https://www.instagram.com/spanionkumar'
            },
            {
                id: 4,
                name: 'Facebook',
                url: 'https://www.facebook.com/AKAspanion'
            },
        ],
        navItems: [{
                id: 0,
                name: 'home',
                tooltip: 'go to home',
            },
            {
                id: 1,
                name: 'about',
                tooltip: 'know about me',
            },
            {
                id: 2,
                name: 'experience',
                tooltip: 'look into my experience',
            },
            {
                id: 3,
                name: 'contact',
                tooltip: 'get in touch with me',
            },
        ],
    },
    mutations: {
        changeCursor(state, payload) {
            state.cursor = payload;
        },
        changeNavMenu(state, payload) {
            state.navMenu = payload;
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
        },
        SHOW_NAV_MENU({
            commit
        }, payload) {
            commit('changeNavMenu', payload)
        }
    },
    getters: {
        cursor(state) {
            return state.cursor
        },
        navMenu(state) {
            return state.navMenu
        },
        navItems(state) {
            return state.navItems
        },
        socialLinks(state) {
            return state.socialLinks
        }
    }
})