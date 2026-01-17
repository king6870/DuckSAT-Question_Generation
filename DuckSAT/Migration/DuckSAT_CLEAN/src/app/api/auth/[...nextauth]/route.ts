import NextAuth from "next-auth/next"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { getProviders, getSecret } from '@/lib/auth'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: getProviders(),
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user) {
        (session.user as { id: string }).id = user.id
      }
      return session
    },
  },
  secret: getSecret(),
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }
