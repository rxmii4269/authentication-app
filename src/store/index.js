import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction, firebaseAction } from "vuexfire";
import { EventBus } from "../event-bus";
import { auth, storage, db, firebase } from "../firebase";
import router from "../router";
Vue.use(Vuex);

const urlRegex = new RegExp(
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
      provider: null,
    },
    userInfo: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    userInfo(state) {
      return state.userInfo;
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
    SET_PROVIDER(state, value) {
      state.user.provider = value;
    },
    SET_ALERT_DATA(state, value) {
      state.alertType = value[0];
      state.alertMessage = value[1];
      state.showAlert = value[2];
    },
    TOGGLE_ALERT(state, value) {
      state.showAlert = value;
    },
  },
  actions: {
    bindUserInfoRef: firebaseAction(({ state, bindFirebaseRef }) => {
      try {
        return bindFirebaseRef(
          "userInfo",
          db.ref("users").child(`${state.user.data.id}`)
        );
      } catch (error) {
        router.replace({ name: "Login" });
      }
    }),

    updateUserInfo: firestoreAction(async (context, userData) => {
      let provider;
      switch (context.state.user.provider) {
        case "google.com":
          provider = new firebase.auth.GoogleAuthProvider();
          break;
        case "facebook.com":
          provider = new firebase.auth.FacebookAuthProvider();
          break;
        case "twitter.com":
          provider = new firebase.auth.TwitterAuthProvider();
          break;
        case "github.com":
          provider = new firebase.auth.GithubAuthProvider();
          break;
        default:
          break;
      }
      try {
        if (userData.email) {
          const response = await auth.currentUser.reauthenticateWithPopup(
            provider
          );
          await auth.currentUser.reauthenticateWithCredential(
            response.credential
          );
          await auth.currentUser.updateEmail(userData.email);
        }
        if (userData.password) {
          await auth.currentUser.updatePassword(userData.password);
        }
        if (
          userData.profilePicture &&
          urlRegex.test(userData.profilePicture) === false
        ) {
          storage
            .ref("user-photos/" + userData.id)
            .put(userData.profilePicture)
            .then(() => {
              storage
                .ref("user-photos/" + userData.id)
                .getDownloadURL()
                .then((url) => {
                  auth.currentUser.updateProfile({
                    photoURL: url,
                  });
                });
            });
        }
        if (userData.bio !== "") {
          db.ref("users").child(userData.id).update({
            bio: userData.bio,
          });
        }
        if (userData.phone !== "") {
          db.ref("users").child(userData.id).update({
            phoneNumber: userData.phone,
          });
        }
        await auth.currentUser.updateProfile({
          displayName: userData.displayName,
        });
        context.dispatch("fetchUser", auth.currentUser);
        EventBus.$emit("showAlert", [
          "success",
          "Profile Saved Successfully",
          true,
        ]);
      } catch (error) {
        EventBus.$emit("showAlert", ["error", "Something went Wrong!", true]);
      }
    }),

    async fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        const token = await user.getIdToken();
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          id: user.uid,
          token: token,
          refresh_token: user.refreshToken,
        });
        commit("SET_PROVIDER", user.providerData[0].providerId);
      } else {
        commit("SET_USER", null);
      }
    },
    addUser: firebaseAction(async (context, user) => {
      try {
        if (user) {
          if (!(await db.ref("users").child(user.uid).get())) {
            return;
          } else {
            return db.ref("users").child(user.uid).set({
              bio: "",
              phoneNumber: "",
            });
          }
        }
      } catch (error) {
        EventBus.$emit("showAlert", [
          "danger",
          "Something went wrong!",
          "true",
        ]);
      }
    }),
  },
  modules: {},
});
