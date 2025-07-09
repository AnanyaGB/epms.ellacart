import { Roboto } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { AuthProvider } from "@/lib/auth-context";

const roboto = Roboto({
  weight: "variable",
  subsets: ["latin"],
});

export const metadata = {
  title: "Employee Product Management System - Ellacart",
  description: "EPMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
