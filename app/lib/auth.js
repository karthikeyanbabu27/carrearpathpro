import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "test@example.com"
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "test123"
        }
      },
      async authorize(credentials) {
        try {
          // Validate credentials format
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required')
          }

          // Test users (remove in production)
          const testUsers = [
            {
              id: '1',
              email: 'test@example.com',
              password: 'test123',
              name: 'Test User',
              role: 'user'
            },
            {
              id: '2',
              email: 'admin@example.com',
              password: 'admin123',
              name: 'Admin User',
              role: 'admin'
            }
          ]

          // Find matching user
          const user = testUsers.find(user => 
            user.email === credentials.email && 
            user.password === credentials.password
          )

          if (!user) {
            throw new Error('Invalid credentials')
          }

          return user
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  debug: process.env.NODE_ENV === 'development'
}

export const getAuthSession = () => getServerSession(authOptions)