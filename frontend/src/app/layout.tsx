import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/ui/AuthModal';

export const metadata: Metadata = {
  title: 'Visit Sri Lanka | One Island. A Thousand Journeys.',
  description: 'Official digital gateway to Sri Lanka tourism. Discover ancient UNESCO heritage rock fortresses, wildlife safaris, golden beaches, Ceylon tea hills, and custom trip itineraries.',
  keywords: ['Sri Lanka tourism', 'Sigiriya', 'Ella', 'Ceylon tea', 'Yala safari', 'Sri Lanka travel guide', 'visit Sri Lanka'],
  openGraph: {
    title: 'Visit Sri Lanka | Official Tourism Gateway',
    description: 'One Island. A Thousand Journeys. Discover ancient heritage, pristine beaches, misty tea hills, and leopards in Sri Lanka.',
    url: 'https://visitsrilanka.gov.lk',
    siteName: 'Visit Sri Lanka',
    images: [
      {
        url: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg',
        width: 1200,
        height: 630,
        alt: 'Sigiriya Rock Fortress Sri Lanka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-ceylon-50 text-ceylon-950 antialiased selection:bg-ceylon-500 selection:text-ceylon-950 flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}
