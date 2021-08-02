<template>
  <div v-if="user" class="dashboard">
    <h1>Personal Info</h1>
    <h2>Basic info, like your name and photo</h2>
    <div class="w-6/12">
      <div class="card">
        <div class="card-head">
          <div>
            <h1 class="card-title">Profile</h1>
            <h2 class="card-subtitle">
              Some info may be visible to other people
            </h2>
          </div>
          <button class="card-btn">Edit</button>
        </div>
        <div class="card-body">
          <div class="card-section">
            <h3>Photo</h3>
            <img
              v-if="user && user.data"
              :src="user.data.profilePicture"
              alt="profile picture"
              height="65"
              width="65"
              class="right"
            />
          </div>
          <div class="card-section">
            <h3>Name</h3>
            <p class="right">{{ user.data.displayName }}</p>
          </div>
          <div class="card-section">
            <h3>Bio</h3>
            <p class="right"></p>
          </div>
          <div class="card-section">
            <h3>Phone</h3>
            <p class="right"></p>
          </div>
          <div class="card-section">
            <h3>Email</h3>
            <p class="right">{{ user.data.email }}</p>
          </div>
          <div class="card-section">
            <h3>Password</h3>
            <p class="right">**********</p>
          </div>
        </div>
      </div>
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
export default {
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  @apply flex flex-col justify-center items-center;
  & h1 {
    @apply text-3xl font-semibold;
  }
  & h2 {
    @apply text-sm font-light;
  }
  & .card {
    @apply mt-12 px-0 pt-3 w-full pb-0;
    &-btn {
      @apply px-7 py-0 h-8 mr-8 border border-gray-400 rounded-xl text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300;
    }
    &-title {
      @apply text-xl mx-8 font-medium;
    }
    &-subtitle {
      @apply text-xs mx-8 mb-3 font-normal text-gray-500;
    }
    &-head {
      @apply flex flex-row justify-between items-center py-2 border-b border-gray-300;
    }
    &-body {
      @apply divide-y divide-gray-300;
    }
    &-section {
      @apply flex items-center justify-center  py-6;
      & h3 {
        @apply uppercase text-gray-300 font-semibold text-sm w-56 ml-8;
      }
      & .right {
        @apply flex-initial mr-auto rounded-md;
      }
    }
  }
  .footer {
    @apply mt-2;
  }
}
</style>
