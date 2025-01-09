import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("./providers"));
import { UserProvider } from "../context/userContext";
import { getSession } from "../lib/lib";
import { Header } from "../components";
import { StateProvider } from "../context/stateContext";
const Toaster = dynamic(() =>
  import("react-hot-toast").then((toast) => toast.Toaster)
);

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Cambourism",
  description: "Bringing the wonders of Cambodia to the world"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get User Info
  let initialUser = null;
  try {
    initialUser = await getSession();
  } catch (error) {
    console.error("Error fetching user session:", error);
  }

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <StateProvider>
          <Providers>
            <UserProvider initialUser={initialUser}>
              <Header />
              {children}
              <Toaster position="bottom-right" />
            </UserProvider>
          </Providers>
        </StateProvider>
      </body>
    </html>
  );
}
