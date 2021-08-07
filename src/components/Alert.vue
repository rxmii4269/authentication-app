<template>
  <div :class="alertClass" v-show="show">
    <span class="alert-icon">
      <font-awesome-icon v-if="icon" :icon="icon" />
    </span>
    <span class="alert-message">
      {{ alertMessage }}
    </span>
    <button class="close-button" @click="close">
      <span>x</span>
    </button>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  data() {
    return {
      show: false,
      alertType: null,
      alertMessage: null,
    };
  },
  created() {
    EventBus.$on("showAlert", this.alertHandler);
  },
  computed: {
    alertClass() {
      if (this.alertType) {
        return "alert-" + this.alertType;
      }
      return "alert-success";
    },
    icon() {
      let icon = null;
      if (this.alertType) {
        switch (this.alertType.toLowerCase()) {
          case "success":
            icon = "check-circle";
            break;
          case "error":
            icon = "times-circle";
            break;
          case "warning":
            icon = "exclamation-triangle";
            break;
          default:
            icon = "check-circle";
            break;
        }
      }
      return icon;
    },
  },
  methods: {
    close() {
      this.show = false;
    },
    alertHandler(value) {
      this.alertType = value[0];
      this.alertMessage = value[1];
      this.show = value[2];

      setTimeout(() => {
        this.close();
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  &-success {
    @apply text-white px-6 py-4 border-0 rounded-lg absolute mb-4 right-4 top-4 bg-green-400 bg-opacity-90;
  }
  &-icon {
    @apply text-xl inline-block mr-5 align-middle cursor-pointer;
  }
  &-message {
    @apply inline-block align-middle mr-8;
  }
}
.close-button {
  @apply absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none;
}
</style>
