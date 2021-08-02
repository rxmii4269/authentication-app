<template>
  <div class="flex flex-col space-y-1">
    <button
      class="flex flex-row text-blue-500 items-center space-x-3 my-3"
      role="button"
      @click="cancelEditing"
    >
      <font-awesome-icon icon="chevron-left" />
      <p>Back</p>
    </button>
    <div class="card">
      <div class="card-head">
        <div>
          <h1 class="card-title">Change Info</h1>
          <h2 class="card-subtitle">
            Changes will be reflected to every services
          </h2>
        </div>
      </div>
      <div class="card-body">
        <div class="card-section flex flex-row items-center">
          <img
            class="rounded-md"
            :src="userInfo.profilePicture"
            height="65"
            width="65"
            alt="profile picture"
          />
          <h3 role="button">Change Photo</h3>
        </div>
        <div class="card-section">
          <form action="#" @submit.prevent="saveProfile" class="form">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                class=""
                type="text"
                name="Name"
                id="name"
                v-model="userInfo.displayName"
                placeholder="Enter your name..."
                required
              />
            </div>
            <div class="form-group">
              <label for="bio">Bio</label>
              <textarea
                name="Bio"
                id="bio"
                cols="20"
                rows="3"
                v-model="userInfo.bio"
                placeholder="Enter your bio..."
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input
                type="text"
                name="Phone"
                id="phone"
                v-model="userInfo.phone"
                placeholder="Enter your phone..."
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                name="Email"
                id="email"
                v-model="userInfo.email"
                placeholder="Enter your email..."
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="Password"
                id="password"
                v-model="userInfo.password"
                placeholder="Enter your new password..."
                required
              />
            </div>
            <button class="form-btn" type="submit">Save</button>
          </form>
        </div>
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
      userInfo: { ...this.userData },
    };
  },
  methods: {
    cancelEditing() {
      this.$emit("cancelEditingProfile", false);
    },
    saveProfile() {
      // console.log(this.userInfo);
      this.$store.dispatch("saveUser", this.userInfo);
    },
    submit() {},
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
    @apply flex flex-row justify-between items-center py-2;
  }
  &-body {
    @apply px-8;
  }
  &-section {
    @apply pb-6 space-x-6;
    & h3 {
      @apply uppercase text-gray-300 font-semibold text-sm w-56 ml-8;
    }
    & .form {
      @apply max-w-xs;
      &-group {
        @apply flex flex-col my-2;
        & label {
          @apply text-sm;
        }
        & input {
          @apply my-0 placeholder-gray-400 text-current focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ease-in-out;
        }
        & textarea {
          @apply rounded-lg border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ease-in-out;
        }
      }
      &-btn {
        @apply mt-2 bg-blue-500 text-white font-normal rounded-lg py-1.5 px-5 inline-block max-w-max;
      }
    }
  }
}
</style>
