import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GymOS - Best Gym in Patna',
  description: 'Pro-level Gym Management System & Fitness Branding',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('gym-theme') || 'midnight-brass';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })()
            `
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
