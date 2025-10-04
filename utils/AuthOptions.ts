import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { prisma } from '@utils/Prisma';
import { encode as jwtEncodeDefault, decode as jwtDecodeDefault } from 'next-auth/jwt';
import { randomUUID } from 'node:crypto';

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
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        return isValid ? user : null;
      },
    }),
  ],
  session: {
    strategy: 'database', // this will let NextAuth manage session tokens in DB
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (existingUser) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: user.name,
              agreement: true,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
        token.status = 'authenticated';
        token.isCreds = account?.provider === 'credentials';
        token.role = (user as any).role || 'user';
        token.sub = String(user.id);
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session.user && user?.id) {
        session.user!.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
        session.user!.phoneNumber = user.phoneNumber;
        session.user!.emailVerified = user.emailVerified;
        session.user!.role = user.role;
        session!.status = true;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/members/signin`) {
        return `${baseUrl}/members/account`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/members/signin',
  },
  jwt: {
    async encode({ token, secret, maxAge }) {
      if (token?.isCreds) {
        const sessionToken = randomUUID();
        if (token.sub != null) {
          await prisma.session.create({
            data: {
              sessionToken,
              userId: parseInt(token.sub, 10),
              expires: new Date(Date.now() + maxAge! * 1000),
            },
          });
        }
        return sessionToken;
      }
      return jwtEncodeDefault({ token, secret, maxAge });
    },
    async decode({ token, secret }) {
      const dbSession = await prisma.session.findUnique({
        where: { sessionToken: token as string },
      });
      if (dbSession) {
        return {
          sub: String(dbSession.userId),
          exp: Math.floor(dbSession.expires.getTime() / 1000),
        };
      }
      return jwtDecodeDefault({ token: token as string, secret });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
