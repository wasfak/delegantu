import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delegantu",
  description: "fast and efficient way to plan the work",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <Toaster position="top-center " />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
