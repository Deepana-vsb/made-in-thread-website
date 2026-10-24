import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Made in Thread | Handcrafted Chettinad Cotton Sarees",
  description:
    "Explore pure handloom Chettinad cotton sarees from Made in Thread. Breathable weaves, vibrant temple borders, and personal WhatsApp enquiries.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
