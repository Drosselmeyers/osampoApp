const admin = require("firebase-admin");

// NODE_ENVによってシークレットのパスを切り替え
// renderにはNODE_ENV=productionと記載すること
const serviceAccount =
  process.env.NODE_ENV === "production"
    ? require("/etc/secrets/osampoapp-b5967-firebase-adminsdk-fbsvc-0109fef0ed.json")
    : require("./osampoapp-b5967-firebase-adminsdk-fbsvc-0109fef0ed.json");

// firebaseAdmin SDK 初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = { auth };
