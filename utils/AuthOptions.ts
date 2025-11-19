import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { prisma } from '@utils/Prisma'
import { encode as jwtEncodeDefault, decode as jwtDecodeDefault } from 'next-auth/jwt'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) return null

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        })

        if (existingUser) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: user.name,
              agreement: true,
            },
          })
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.phoneNumber = user.phoneNumber
        token.status = 'authenticated'
        token.isCreds = account?.provider === 'credentials'
        token.role = user.role || 'user'
        token.sub = String(user.id)
      }
      return token
    },
    async session({ session, user }) {
      if (session.user && user?.id) {
        session.user.id = String(user.id)
        session.user.email = user.email
        session.user.name = user.name
        session.user.phoneNumber = (user as any).phoneNumber
        session.user.emailVerified = user.emailVerified
        session.user.role = (user as any).role
        session.status = true
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/members/signin`) {
        return `${baseUrl}/members/account`
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  pages: {
    signIn: '/members/signin',
  },
  jwt: {
    async encode({ token, secret, maxAge }) {
      if (token?.isCreds) {
        const sessionToken = crypto.randomUUID()
        if (token.sub != null) {
          await prisma.session.create({
            data: {
              sessionToken,
              userId: parseInt(token.sub, 10),
              expires: new Date(Date.now() + maxAge! * 1000),
            },
          })
        }
        return sessionToken
      }
      return jwtEncodeDefault({ token, secret, maxAge })
    },
    async decode({ token, secret }) {
      // Fix: Check if token exists and is a string before proceeding
      if (!token || typeof token !== 'string') {
        return null
      }

      try {
        // Try to find session in database first
        const dbSession = await prisma.session.findUnique({
          where: { sessionToken: token },
        })

        if (dbSession) {
          return {
            sub: String(dbSession.userId),
            exp: Math.floor(dbSession.expires.getTime() / 1000),
          }
        }

        // Fallback to JWT decode for OAuth providers
        return jwtDecodeDefault({ token, secret })
      } catch (error) {
        console.error('Error decoding token:', error)
        return null
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
