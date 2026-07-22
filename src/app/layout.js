import "./globals.css";

export const metadata = {
  title: "EasyPharma — India's Smartest Pharmacy Management Software",
  description: "Complete pharmacy management: GST billing, drug inventory, prescription tracking, patient CRM and analytics. CDSCO compliant. Free 30-day trial.",
  keywords: "pharmacy management software, pharmacy POS, drug inventory, GST billing pharmacy, CDSCO compliant, prescription management India, chemist billing software, medical store software",
  alternates: {
    canonical: "https://mmrtechsolutions.vercel.app",
  },
  openGraph: {
    title: "EasyPharma — India's Smartest Pharmacy Management Software",
    description: "Complete pharmacy management: GST billing, drug inventory, prescription tracking, patient CRM and analytics. CDSCO compliant.",
    url: "https://mmrtechsolutions.vercel.app",
    siteName: "EasyPharma",
    images: [
      {
        url: "https://mmrtechsolutions.vercel.app/dashboard.png",
        width: 1200,
        height: 630,
        alt: "EasyPharma Dashboard Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyPharma — India's Smartest Pharmacy Management Software",
    description: "Complete pharmacy management: GST billing, drug inventory, prescription tracking, patient CRM and analytics.",
    images: ["https://mmrtechsolutions.vercel.app/dashboard.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "EasyPharma",
  "operatingSystem": "All (Cloud and Hybrid Offline)",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
  },
  "description": "Complete pharmacy management software for Indian pharmacies: GST billing, drug inventory, prescription tracking, patient CRM and analytics. CDSCO compliant.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "150",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}