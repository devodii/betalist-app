import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {}, // leave empty because we have a dedicated sign-in page
      },
      async authorize(credentials) {
        const user = { id: "42", email: "odii@gmail.com" };
        const isAuthed = credentials?.email == user.email;
        return isAuthed ? user : null;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
    error: "/not-found",
  },
});

export { handler as GET, handler as POST };
