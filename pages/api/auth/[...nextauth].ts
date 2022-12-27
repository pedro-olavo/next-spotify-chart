import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

export const options: NextAuthOptions = {
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
    session: async ({ session, user, token }) => {
      session.user.access_token = token.accessToken || 'no_token';

      return session;
    },
  },

  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-top-read',
    }),
  ],
};

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default handler;
