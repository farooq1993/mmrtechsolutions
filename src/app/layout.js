import "./globals.css";

export const metadata = {
  title: "EasyPharma — India's Smartest Pharmacy Management Software",
  description: "Complete pharmacy management: GST billing, drug inventory, prescription tracking, patient CRM and analytics. CDSCO compliant. Free 30-day trial.",
  keywords: "pharmacy management software, pharmacy POS, drug inventory, GST billing pharmacy, CDSCO compliant, prescription management India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}