<template>
  <div id="app">
    <NavBar v-if="user.loggedIn" />
    <router-view />
    <Alert />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/Navbar";
import Alert from "@/components/Alert";
export default {
  components: {
    NavBar,
    Alert,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {};
  },
};
</script>
