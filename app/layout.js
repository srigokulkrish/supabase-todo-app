import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Supabase Todo App",
  description: "A simple todo app with Next.js and Supabase",
};

import BootstrapClient from "@/components/BootstrapClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
