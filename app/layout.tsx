// types
import { type Metadata, type Viewport } from 'next';

// styles
import './styles/ui.css';
import './styles/site.css';
import './styles/payment.css';
import './styles/page.css';
import './styles/footer.css';
import './styles/header.css';
import SessionWrapper from '@components/SessionWrapper';

// variables
export const runtime = 'edge';

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => (
  <html lang='en'>
    <body>
      <SessionWrapper>{children}</SessionWrapper>
    </body>
  </html>
);

const title = 'accelero ticketing';
const canonical = 'https://accelero-ticketing.com';
const description = 'accelero ticketing is a accelero ticketing solution';

export const viewport: Viewport = {
  width: 'device-width',
  themeColor: '#ffffff',
  initialScale: 1,
};

export const metadata: Metadata = {
  title,
  description,
  robots: 'noindex, nofollow', // TODO: change in production
  keywords: 'accelero ticketing',
  alternates: { canonical },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
    shortcut: '/logo192.png',
  },
  metadataBase: new URL(canonical),
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'website',
    images: '/logo192.png',
    siteName: 'accelero ticketing',
  },
};

export default RootLayout;
