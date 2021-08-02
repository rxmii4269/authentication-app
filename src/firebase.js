import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const { VUE_APP_ENV_FIRESTORE_API_KEY } = process.env;
const { VUE_APP_ENV_FIRESTORE_PROJECT_ID } = process.env;
const { VUE_APP_ENV_FIRESTORE_AUTH_DOMAIN } = process.env;
const { VUE_APP_ENV_FIRESTORE_STORAGE_BUCKET } = process.env;
const { VUE_APP_ENV_FIRESTORE_APP_ID } = process.env;

const firebaseConfig = {
  apiKey: VUE_APP_ENV_FIRESTORE_API_KEY,
  projectId: VUE_APP_ENV_FIRESTORE_PROJECT_ID,
  authDomain: VUE_APP_ENV_FIRESTORE_AUTH_DOMAIN,
  storageBucket: VUE_APP_ENV_FIRESTORE_STORAGE_BUCKET,
  appId: VUE_APP_ENV_FIRESTORE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const usersCollection = db.collection("users");

export { db, auth, storage, usersCollection };
