import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

export const options = {
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.access_token = token.accessToken;
      return session;
    },
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-top-read',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
