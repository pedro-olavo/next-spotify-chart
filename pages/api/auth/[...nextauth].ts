import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

async function refreshAccessToken(token: JWT) {
  try {
    const url =
      'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
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
      throw new Error('RefreshAccessTokenError');
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      expires_at: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error,
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
        const expires_at = (account.expires_at || 0) * 1000;

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expires_at,
        };
      }

      if (Date.now() < token.expires_at) {
        return token;
      }

      return refreshAccessToken(token);
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
        'https://accounts.spotify.com/authorize?scope=user-top-read+user-read-recently-played+user-read-email+user-follow-read',
    }),
  ],
};

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default handler;
