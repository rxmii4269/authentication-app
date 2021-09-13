<template>
  <div v-if="user" class="dashboard">
    <h1>Personal Info</h1>
    <h2>Basic info, like your name and photo</h2>
    <div class="w-full md:w-6/12 xl:w-6/12 2xl:w-6/12">
      <Profile
        v-if="!isEditing"
        @editProfile="toggleEditProfile($event)"
        :userData="user.data"
      />
      <EditProfile
        v-else
        @cancelEditingProfile="toggleEditProfile($event)"
        @saveProfile="toggleSaveProfile($event)"
        :userData="user.data"
      />
      <div class="footer">
        <p>created by <span>romaine</span></p>
        <p>
          <a
            href="https://devchallenges.io/"
            target="_blank"
            rel="noopener noreferrer"
            >devChallenges.io</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Profile from "../components/Profile.vue";
import EditProfile from "../components/EditProfile.vue";
export default {
  components: {
    Profile,
    EditProfile,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    toggleEditProfile(isEditing) {
      this.isEditing = isEditing;
    },
    toggleSaveProfile(value) {
      this.isEditing = value;

      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  @apply flex flex-col justify-center items-center;
  & h1 {
    @apply text-3xl font-semibold dark:text-white;
  }
  & h2 {
    @apply text-sm font-light dark:text-white;
  }

  .footer {
    @apply mt-2;
  }
}
</style>
