import { type NextAuthOptions } from 'next-auth'
import { verifyUser } from '@action'
import CredentialsProvider from 'next-auth/providers/credentials'

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
    })
  ],

  pages: {
    signIn: '/sign-in',
    error: '/not-found'
  }
}

