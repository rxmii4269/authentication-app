import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { usersCollection } from "../firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    userInfo: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    ...vuexfireMutations,
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    bindUserRef: firestoreAction((context) => {
      return context.bindFirestoreRef("userInfo", usersCollection);
    }),

    // eslint-disable-next-line no-unused-vars

    saveUser: firestoreAction((context, userData) => {
      console.log(userData);
      return usersCollection.doc(userData.id).update({ ...userData });
    }),

    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        console.log(user);
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          id: user.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
  modules: {},
});
