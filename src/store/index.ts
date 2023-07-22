import {createStore} from 'vuex'

export default createStore({
    state: {
        stops: []
    },
    getters: {
        getStops: state => state.stops
    },
    mutations: {
        SET_STOPS(state, payload) {
            state.stops = payload;
        }
    },
    actions: {
        setStops({
                     commit
                 }, payload) {
            commit("SET_STOPS", payload);
        }
    }
})
