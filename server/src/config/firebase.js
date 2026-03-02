const admin = require("firebase-admin");
// localで動かすとき
const env = process.env.NODE_ENV || "./";
const serviceAccount = require(
  `${env}osampoapp-b5967-firebase-adminsdk-fbsvc-0109fef0ed.json`,
);

//productionで動かすとき
// const serviceAccount = require("/etc/secrets/osampoapp-b5967-firebase-adminsdk-fbsvc-0109fef0ed.json");

// firebaseAdmin SDK 初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = { auth };
