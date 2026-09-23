import "./globals.css";

export const metadata = {
  title: "MMR SOFTWARE SOLUTIONS — EasyPharma | Retail & Wholesale Pharma ERP",
  description: "Next-generation Pharmaceutical Software Suite by MMR SOFTWARE SOLUTIONS. EasyPharma Retail POS for Chemist Shops & EasyPharma Wholesale ERP for Distributors. Head Office: Marine Lines (E), Mumbai.",
  keywords: "MMR SOFTWARE SOLUTIONS, MMR Tech Solutions, EasyPharma, pharma retail POS, pharma wholesale ERP, chemist billing software, pharmaceutical distributor software, medical store software Mumbai, GST billing pharmacy, CDSCO compliant",
  alternates: {
    canonical: "https://mmrtechsolutions.vercel.app",
  },
  openGraph: {
    title: "MMR SOFTWARE SOLUTIONS — EasyPharma (Retail & Wholesale)",
    description: "Next-generation Pharma Management Software: Retail POS & Wholesale Distribution ERP. Head Office: Marine Lines (E), Mumbai.",
    url: "https://mmrtechsolutions.vercel.app",
    siteName: "MMR SOFTWARE SOLUTIONS",
    images: [
      {
        url: "https://mmrtechsolutions.vercel.app/wholesale_dashboard.png",
        width: 1200,
        height: 630,
        alt: "MMR SOFTWARE SOLUTIONS EasyPharma Suite",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MMR SOFTWARE SOLUTIONS — EasyPharma Retail & Wholesale Suite",
    description: "Comprehensive Pharma Management Solutions for Retail Chemists & Wholesale Stockists. Head Office: Marine Lines (E), Mumbai.",
    images: ["https://mmrtechsolutions.vercel.app/wholesale_dashboard.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "MMR SOFTWARE SOLUTIONS",
      "url": "https://mmrtechsolutions.vercel.app",
      "logo": "https://mmrtechsolutions.vercel.app/easyPharma_logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Marine Lines (East)",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400002",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9657847644",
        "contactType": "sales",
        "email": "farooqaziz1993@gmail.com",
        "areaServed": "IN"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "EasyPharma Suite by MMR SOFTWARE SOLUTIONS",
      "operatingSystem": "Web, Windows, Android (Hybrid Cloud & Offline)",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "180"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&display=swap" rel="stylesheet" />
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