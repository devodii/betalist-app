import { type NextAuthOptions } from 'next-auth'
import { verifyUser } from '@action'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const clientId =
  '617383458419-cqlu0fcbf2u4eddor6mvj83meb2gpfca.apps.googleusercontent.com'
const clientSecret = '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'
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },

  providers: [
    GoogleProvider({
      clientId,
      clientSecret
    })
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile!')
      }
      console.log({ account, profile })
      return true // Do different verification for other providers that don't have `email_verified`
    }
  },

  pages: {
    signIn: '/sign-in',
    error: '/not-found'
  }
}

