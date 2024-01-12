import { type NextAuthOptions } from 'next-auth'
import { verifyUser } from '@action'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {}, // include these fields because we have a dedicated sign-in/up page
        password: {}
      },
      async authorize(credentials) {
        const { status, user } = await verifyUser(
          credentials?.email!,
          credentials?.password!
        )
        return status ? user : null
      }
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // if (!profile?.email) {
      //   throw new Error('No profile!')
      // }
      console.log({ account, profile })
      return true // Do different verification for other providers that don't have `email_verified`
    }
  },

  pages: {
    signIn: '/sign-in',
    error: '/not-found'
  }
}

