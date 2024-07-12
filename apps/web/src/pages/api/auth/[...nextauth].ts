import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.username,
          password: credentials?.password,
        }

        try {
          const { data: user } = await axios.post(
            `${process.env.BACKEND_URL}/auth/login`,
            payload,
          )

          if (user) {
            return user
          }

          return null
        } catch (error) {
          throw new Error()
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.user = user.user
        return {
          ...token,
          accessToken: token.user?.accessToken,
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: 'secret', // Hardcoded only because we need to get the user payload in middleware.ts, as next-auth requires this secret (NEXTAUTH_SECRET)
})
