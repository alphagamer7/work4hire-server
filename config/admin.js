const admin = require("firebase-admin");
const serviceAccount = require("./work4hire-8a56a-firebase-adminsdk-mt8sw-4aa7a2ff05");
const config = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://go-first-mvp-dev.firebaseio.com",
  storageBucket: process.env.STORAGE_BUCKET,
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { admin, db, storage };