/* eslint-disable @next/next/no-head-element */
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className="cursor-pointr h-screen w-screen bg-black p-3">
        {children}
      </body>
    </html>
  );
}
