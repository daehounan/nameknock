import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "NameKnock — Knock out brand names before you brand hard";
const description =
  "NameKnock is a public-DB knockout screen for indie founders. Paste 1–N brand name candidates and see USPTO/public trademarks, real-world product use, and major TLD availability as pass / caution / fail — before you brand hard. Not legal advice.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "NameKnock",
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "NameKnock",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
