import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sacco OS | Management Portal",
  description: "Enterprise-grade SACCO and SME management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] font-sans">
        <main className="flex-1 w-full max-w-[420px] mx-auto min-h-screen relative">
          {children}
        </main>
      </body>
    </html>
  );
}
