// types
import { type Metadata, type Viewport } from "next";

// styles
import "./styles/site.css";
import "./styles/payment.css";
import "./styles/page.css";
import "./styles/footer.css";
import "./styles/header.css";
import SessionWrapper from "@components/SessionWrapper";

// variables
export const runtime = "edge";

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
  <SessionWrapper>{children}</SessionWrapper>
  </body>
  </html>
);

const title = "Accelero Foundation - Transforming Education in Indonesia";
const canonical = "https://accelero.vercel.app";
const description =
  "Join us in improving foundational literacy and numeracy in underserved schools through Teaching at the Right Level (TaRL) programs.";

export const viewport: Viewport = {
  width: "device-width",
  themeColor: "#667eea",
  initialScale: 1,
};

export const metadata: Metadata = {
  title,
  description,
  robots: "index, follow",
  keywords:
    "education, literacy, numeracy, Indonesia, nonprofit, donation, teaching, TaRL, Accelero Foundation",
  alternates: { canonical },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
    shortcut: "/logo192.png",
  },
  metadataBase: new URL(canonical),
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    images: "/logo192.png",
    siteName: "Accelero Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo192.png"],
  },
};

export default RootLayout;