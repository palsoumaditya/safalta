import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

export const metadata = {
  title: "Safalta",
  description: "Guide you to your career through AI",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark, neobrutalism],
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen mt-16">{children}</main> {/* Adjusted margin-top for navbar */}
            
            {/* Footer Section */}
            <footer className="bg-background py-12">
              <div className="container mx-auto text-center px-4 text-gray-200">
                <p>
                  Made with ❤️ by{" "}
                  <a
                    href="https://soumadityapal.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Soumaditya
                  </a>
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
