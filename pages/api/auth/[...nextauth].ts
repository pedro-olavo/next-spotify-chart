import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: JWT) {
  console.log('Entrou na função refresh token');
  try {
    const url =
      'https://accounts.spotify.com/api/token' +
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }

      if (new Date() < new Date(token.exp * 1000)) {
        return token;
      }

      return refreshAccessToken(token);
    },

    session: async ({ session, user, token }) => {
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
    }),
  ],
};

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default handler;
