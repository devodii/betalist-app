import { verifyUser } from "@action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },
    async signIn({ user }) {
      await verifyUser(user?.email!);
      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/not-found",
  },
});

export { handler as GET, handler as POST };
