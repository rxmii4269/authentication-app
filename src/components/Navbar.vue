<template>
  <div class="navbar">
    <img
      class="nav-logo"
      src="@/assets/img/devchallenges.svg"
      alt="navbar logo"
      width="140"
      height="140"
    />
    <nav v-if="user && user.data" class="navbar-nav">
      <div class="nav-item dropdown">
        <div class="dropdown-toggle" @click="toggleMenu">
          <img
            :src="user.data.profilePicture"
            class="navbar-img"
            alt="profile picture"
            height="40"
            width="40"
          />
          <p class="hidden md:block xl:block 2xl:block">
            {{ user.data.displayName }}
          </p>
          <font-awesome-icon
            :icon="isOpen ? 'sort-up' : 'sort-down'"
            class="dropdown-toggle-icon"
          />
        </div>
        <div class="dropdown-menu" :class="{ openMenu: isOpen }">
          <router-link to="/profile">
            <div class="dropdown-menu-item" @click="toggleMenu">
              <font-awesome-icon
                icon="user-circle"
                class="text-xl opacity-60"
              />
              <p>My Profile</p>
            </div>
          </router-link>
          <div role="button" class="dropdown-menu-item" @click="toggleMenu">
            <font-awesome-icon
              icon="user-friends"
              class="text-xl opacity-60"
            ></font-awesome-icon>
            <p>Group Chat</p>
          </div>
          <hr />
          <div role="button" class="dropdown-menu-item" @click="logout">
            <font-awesome-icon
              icon="sign-out-alt"
              class="text-xl text-red-500"
            ></font-awesome-icon>
            <p class="text-red-500">Logout</p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "../firebase";
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    async logout() {
      await auth.signOut();
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  @apply my-3 flex flex-row justify-between mx-6;

  &-img {
    @apply rounded-md h-10 w-10;
  }

  & .dropdown {
    &-toggle {
      @apply flex justify-between items-center space-x-3 font-semibold p-2 rounded hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer;
      &-icon {
        @apply hidden md:block xl:block 2xl:block;
      }
    }
    &-menu {
      @apply bg-white;
      &.openMenu {
        @apply visible;
      }
      @apply px-3 py-2.5 border border-gray-200 rounded-lg shadow absolute w-56 right-6 top-20 invisible transition duration-500 ease-in-out;
      &-item {
        @apply rounded-lg px-3 py-1 hover:bg-gray-100 transition-colors duration-300 ease-in-out font-medium flex items-center space-x-3 my-2;
        * {
          @apply my-2;
        }
      }
    }
  }
  hr {
    @apply border border-gray-200 rounded;
  }
}
</style>
