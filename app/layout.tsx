/* eslint-disable @next/next/no-head-element */
import '../styles/globals.css';
import { Barlow, Montserrat } from '@next/font/google';

const barlow = Barlow({
  weight: ['700'],
  variable: '--font-barlow',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${barlow.variable} ${montserrat.variable}`}>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <body>{children}</body>
    </html>
  );
}
