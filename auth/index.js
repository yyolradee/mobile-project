import * as Google from "expo-auth-session/providers/google"

export const [req, res, promptAsync] = Google.useAuthRequest({
  iosClientId: '159187597555-1r0pco54a6g3kk3c3so15d7ojq5pv3nv.apps.googleusercontent.com',
  androidClientId: '159187597555-jta8s5e5mhlh4et2st5lq45eu2bvhs3q.apps.googleusercontent.com',
});