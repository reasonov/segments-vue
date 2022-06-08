import {createStore} from "vuex";

export default createStore({
    state: {
        windowWidth: 0
    },
    mutations: {
        updateWindowWidth(state, val) {
            state.windowWidth = val;
        }
    }
})