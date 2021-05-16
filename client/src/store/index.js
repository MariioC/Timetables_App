import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id_user: null,
        alert: {
            type: null,
            message: null,
        },
        hours: [],
        turns: []
    },
    mutations: {
        setIdUser(state, id_user) {
            state.id_user = id_user;
        },
        setAlert(state, alert) {
            state.alert = alert;
        },
        setHours(state, hours) {
            state.hours = hours;
        },
        setTurns(state, turns) {
            state.turns = turns;
        },
        updateTurnsTake(state, turn) {
            const index = state.turns.findIndex(t => t.id_hour == turn.id_hour && t.id_user == turn.id_user);
            if(index == -1) state.turns.push(turn);
        },
        updateTurnsDelete(state, turn) {
            const index = state.turns.findIndex(t => t.id_hour == turn.id_hour && t.id_user == turn.id_user);
            state.turns.splice(index, 1);
        },
        logout(state) {
            state.id_user = null;
            state.turns = [];
            state.hours = [];
            state.alert = {
                type: null,
                message: null,
            };
        }
    },
    actions: {
        setIdUser({ commit }, id_user) {
            commit('setIdUser', id_user);
        },
        setAlert({ commit }, alert) {
            commit('setAlert', alert);
        },
        setHours({ commit }, hours) {
            commit('setHours', hours);
        },
        setTurns({ commit }, turns) {
            commit('setTurns', turns);
        },
        updateTurnsTake({ commit }, turn) {
            commit('updateTurnsTake', turn);
        },
        updateTurnsDelete({ commit }, turn) {
            commit('updateTurnsDelete', turn);
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            localStorage.removeItem('id_user');
            commit('logout');
        }
    },
    modules: {

    },
});
