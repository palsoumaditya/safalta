import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Safalta",
  description: "Guide you to your carrier through ai",
};
const inter = Inter({subsets: ['latin']});
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header/>
            <main className="min-h-screen">{children}</main>
            {/* Footer */}
            <footer className="bg-muted/50 py-12">
            <div className="container mx-auto text-center px-4 text-grey-200">
              <p>
                Made with Love by Soumaditya
              </p>
            </div>
            </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
