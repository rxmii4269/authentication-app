import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/scss/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSortUp,
  faSortDown,
  faUserCircle,
  faUserFriends,
  faSignOutAlt,
  faChevronLeft,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSortUp,
  faSortDown,
  faUserCircle,
  faUserFriends,
  faSignOutAlt,
  faChevronLeft,
  faTimesCircle,
  faCheckCircle,
  faExclamationTriangle
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

auth.onAuthStateChanged(async (user) => {
  await store.dispatch("fetchUser", user);
  await store.dispatch("bindUserInfoRef");
  let app;

  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
