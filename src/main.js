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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSortUp,
  faSortDown,
  faUserCircle,
  faUserFriends,
  faSignOutAlt,
  faChevronLeft
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
  store.dispatch("bindUserRef");
  let app;

  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
