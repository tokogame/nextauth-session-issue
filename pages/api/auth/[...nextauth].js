import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { reqGoogleTokenSignIn } from "../../../services/services";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  debug: true,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // 30 days.
    // We need to handle if backend returns error which says that token has expired
    // and then force logout user.
    maxAge: 30 * 24 * 60 * 60,

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex")
    // }
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the user.authToken from signIn callback to the token.authToken

      if (account) {
        // Handle the Google ID token here
        const googleIdToken = account.id_token;
        // console.log("nextauth.js jwt: got googleIdToken " + googleIdToken);
        // Send the Google ID token to our backend for verification
        // and exchange it for our backend's token
        // TODO: no way to get locale for now.
        const res = await reqGoogleTokenSignIn(null, googleIdToken);
        const member = res?.data?.data;
        if (member == null) {
          console.log(
            "nextauth.js jwt reqGoogleTokenSignIn: Failed response from be"
          );
          return token;
        }

        console.log(
          "nextauth.js jwt reqGoogleTokenSignIn: Received response from be. authToken: " +
            member.authToken
        );

        let newToken = {};
        newToken.userId = member.id;
        newToken.authToken = member.authToken;
        newToken.profilePictureUrl = member.profilePictureUrl;
        newToken.fullName = member.fullName;
        newToken.emailAddress = member.emailAddress;
        newToken.phoneNumber = member.phoneNumber;

        console.log("nextauth.js jwt: setting token's userId and authToken");
        return newToken;
      }

      return token;
    },

    async session({ session, token }) {
      // Persist the token.authToken from jwt callback to the session.authToken

      console.log(
        "nextauth.js session: setting session's userId and authToken"
      );
      session.userId = token?.userId;
      session.authToken = token?.authToken;
      session.profilePictureUrl = token?.profilePictureUrl;
      session.fullName = token?.fullName;
      session.emailAddress = token?.emailAddress;
      session.phoneNumber = token?.phoneNumber;

      return session;
    },
  },
};
export default NextAuth(authOptions);
