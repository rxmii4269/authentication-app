<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div class="card">
      <div class="card-header">
        <img
          src="@/assets/img/devchallenges.svg"
          alt="Logo"
          width="120"
          height="120"
          class="card-logo-light"
        />
        <img
          src="@/assets/img/devchallenges-light.svg"
          alt="Logo"
          width="120"
          height="120"
          class="card-logo-dark"
        />
        <p class="title">Join thousands of learners from around the world</p>
        <p class="subtitle">
          Master web development by making real-live projects. There are
          multiple paths for you to choose.
        </p>
      </div>
      <div class="card-body">
        <div v-if="error" class="card-error">
          <button class="close-btn" @click="dismiss"></button>
          <p>{{ error }}</p>
        </div>
        <form action="#" @submit.prevent="submit">
          <input
            type="email"
            name="Email"
            id="email"
            aria-label="Email"
            placeholder="Email"
            v-model="form.email"
            autofocus
            required
            autocomplete="email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            v-model="form.password"
            autofocus
            required
            autocomplete="current-password"
          />
          <button class="login-btn" type="submit">Start coding now</button>
        </form>
        <p class="divider">or continue with these social profile</p>
        <div class="social-btns">
          <div class="social-login" @click="continueGoogle">
            <img src="@/assets/img/Google.svg" alt="Google logo" />
          </div>
          <div class="social-login" @click="continueFacebook">
            <img src="@/assets/img/Facebook.svg" alt="Facebook logo" />
          </div>
          <div class="social-login" @click="continueTwitter">
            <img src="@/assets/img/Twitter.svg" alt="Twitter logo" />
          </div>
          <div class="social-login" @click="continueGithub">
            <img src="@/assets/img/Github.svg" alt="Github logo" />
          </div>
        </div>
        <p class="card-footer">
          Already a member?
          <router-link to="/login">Login</router-link>
        </p>
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
</template>
<script>
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    dismiss() {
      this.error = "";
    },
    async submit() {
      try {
        await auth.createUserWithEmailAndPassword(
          this.form.email,
          this.form.password
        );
        this.$router.replace({ name: "Login" });
      } catch (err) {
        this.error = err.message;
      }
    },
    async continueGoogle() {
      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(googleProvider);
      } catch (error) {
        this.error = error.message;
      }
    },
    async continueFacebook() {
      try {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        await auth.signInWithPopup(facebookProvider);
      } catch (error) {
        this.error = error.message;
      }
    },
    async continueTwitter() {
      try {
        const twitterProvider = new firebase.auth.TwitterAuthProvider();
        await auth.signInWithPopup(twitterProvider);
      } catch (error) {
        this.error = error.message;
      }
    },
    async continueGithub() {
      try {
        const githubProvider = new firebase.auth.GithubAuthProvider();
        await auth.signInWithPopup(githubProvider);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
