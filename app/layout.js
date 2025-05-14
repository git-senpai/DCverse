import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Avatar Dashboard",
  description: "A modern dashboard for managing AI avatars",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children}
        {/* Script to prevent flickering by setting the theme class early */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    const storedPrefs = window.localStorage.getItem('theme');
                    if (typeof storedPrefs === 'string') {
                      return storedPrefs;
                    }
                    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
                    if (userMedia.matches) {
                      return 'dark';
                    }
                  }
                  return 'light'; // default theme
                }
                const theme = getThemePreference();
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
