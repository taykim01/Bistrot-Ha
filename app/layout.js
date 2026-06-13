import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import Watermark from './components/Watermark';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata = {
  metadataBase: new URL('https://bistrotha.com'),
  title: 'Bistrot Ha | French-Vietnamese Fine Dining in Lower East Side, NYC',
  description: "Bistrot Ha is a premier French-Vietnamese restaurant in NYC's Lower East Side by chefs Anthony Ha and Sadie Mae Burns. Experience a vibrant collision of classic French bistro fare and bold Vietnamese flavours.",
  openGraph: {
    title: 'Bistrot Ha | French-Vietnamese Fine Dining in Lower East Side, NYC',
    description: "Bistrot Ha is a premier French-Vietnamese restaurant in NYC's Lower East Side by chefs Anthony Ha and Sadie Mae Burns. Experience a vibrant collision of classic French bistro fare and bold Vietnamese flavours.",
    url: 'https://bistrotha.com',
    siteName: 'Bistrot Ha',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/bistrot_ha_ambiance.png',
        width: 1200,
        height: 630,
        alt: 'Bistrot Ha Warm Candle-lit Ambiance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bistrot Ha | French-Vietnamese Fine Dining in Lower East Side, NYC',
    description: "Bistrot Ha is a premier French-Vietnamese restaurant in NYC's Lower East Side by chefs Anthony Ha and Sadie Mae Burns. Experience a vibrant collision of classic French bistro fare and bold Vietnamese flavours.",
    images: ['/assets/bistrot_ha_ambiance.png'],
  },
  alternates: {
    canonical: 'https://bistrotha.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {children}
        <Watermark />
      </body>
    </html>
  );
}
