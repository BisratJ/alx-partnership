import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          hd: process.env.GOOGLE_AUTHORIZED_DOMAIN, // Restrict to @alxafrica.com
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow emails from authorized domain
      const authorizedDomain = process.env.GOOGLE_AUTHORIZED_DOMAIN;
      if (authorizedDomain && !user.email?.endsWith(`@${authorizedDomain}`)) {
        console.log(`Unauthorized email domain: ${user.email}`);
        return false;
      }

      // Create or update user in database
      try {
        await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            fullName: user.name || user.email!,
            googleSubId: account?.providerAccountId,
          },
          create: {
            email: user.email!,
            fullName: user.name || user.email!,
            googleSubId: account?.providerAccountId,
            role: 'REVIEWER', // Default role
          },
        });
        return true;
      } catch (error) {
        console.error('Error creating user:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
