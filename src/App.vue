<template>
  <div id="app">
    <NavBar v-if="user.loggedIn" />
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/Navbar";
export default {
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
