// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./providers/AuthProvider";
import LayoutContent from "./components/LayoutContent.js";
import ChakraClientProvider from "./components/ChakraProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ----------- METADATA (JS VERSION) -----------
export const metadata = {
  title: {
    default: "Mentroid - Learn AI with India's Best Mentors",
    template: "%s | Mentroid",
  },
  description:
    "Master Artificial Intelligence, Machine Learning, Generative AI & more with live mentorship, projects & placements. Learn from industry experts at Mentroid.",
  keywords:
    "AI courses, machine learning, generative AI, deep learning, LLM, prompt engineering, mentroid, learn AI India",

  metadataBase: new URL("https://mentroid.in"),

  openGraph: {
    title: "Mentroid - Learn AI with Real Mentors",
    description:
      "India's #1 AI Learning Platform with Live Mentorship & 100% Placement Support",
    url: "https://mentroid.in",
    siteName: "Mentroid",
    images: ["/og-image.jpg"],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mentroid - Learn AI with Mentors",
    description: "Live AI Courses • Projects • Placements",
    images: ["/twitter-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://mentroid.in",
  },
};

// ----------- LAYOUT (JS VERSION) -----------
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
