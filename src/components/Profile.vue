<template>
  <div class="card">
    <div class="card-head">
      <div>
        <h1 class="card-title">Profile</h1>
        <h2 class="card-subtitle">Some info may be visible to other people</h2>
      </div>
      <button class="card-btn" @click="editProfile">Edit</button>
    </div>
    <div class="card-body">
      <div class="card-section">
        <h3>Photo</h3>
        <img
          v-if="userData"
          :src="userData.profilePicture"
          alt="profile picture"
          height="65"
          width="65"
          class="right"
        />
      </div>
      <div class="card-section">
        <h3>Name</h3>
        <p class="right">{{ userData.displayName }}</p>
      </div>
      <div class="card-section">
        <h3>Bio</h3>
        <p class="right">{{ userData.bio }}</p>
      </div>
      <div class="card-section">
        <h3>Phone</h3>
        <p class="right">{{ userData.phone }}</p>
      </div>
      <div class="card-section">
        <h3>Email</h3>
        <p class="right">{{ userData.email }}</p>
      </div>
      <div class="card-section">
        <h3>Password</h3>
        <p class="right">**********</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    editProfile() {
      this.edit = !this.edit;
      this.$emit("editProfile", this.edit);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
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
</style>
