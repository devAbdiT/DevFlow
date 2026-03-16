import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});
//This is the heart of your authentication system - it configures how Auth.js behaves in your Next.js app.
