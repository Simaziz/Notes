import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic to verify user credentials (e.g., check against a database)
        const user = { id: 1, email: 'user@example.com', password: 'password123' }; // Example user

        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          return user; // Return the user object if credentials are valid
        } else {
          return null; // Return null if credentials are invalid
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the /notes page after login
      return url.startsWith(baseUrl) ? url : baseUrl + '/notes';
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };