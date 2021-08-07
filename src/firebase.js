import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const { VUE_APP_ENV_FIRESTORE_API_KEY } = process.env;
const { VUE_APP_ENV_FIRESTORE_PROJECT_ID } = process.env;
const { VUE_APP_ENV_FIRESTORE_AUTH_DOMAIN } = process.env;
const { VUE_APP_ENV_FIRESTORE_STORAGE_BUCKET } = process.env;
const { VUE_APP_ENV_FIRESTORE_APP_ID } = process.env;
const { VUE_APP_ENV_RTDB_DOMAIN } = process.env;

const firebaseConfig = {
  apiKey: VUE_APP_ENV_FIRESTORE_API_KEY,
  projectId: VUE_APP_ENV_FIRESTORE_PROJECT_ID,
  authDomain: VUE_APP_ENV_FIRESTORE_AUTH_DOMAIN,
  storageBucket: VUE_APP_ENV_FIRESTORE_STORAGE_BUCKET,
  appId: VUE_APP_ENV_FIRESTORE_APP_ID,
  databaseURL: VUE_APP_ENV_RTDB_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage, firebase };
