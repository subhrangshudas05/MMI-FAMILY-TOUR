import { Poppins, Federo } from "next/font/google";

import "./globals.css";
import HeaderMenu from "@/components/HeaderMenu";
import { NavigationProvider } from "@/app/NavProvider";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { Suspense } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const federo = Federo({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-federo",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Best Family Travel Agency in India | MIMI Family Tour",
  description:
    "Discover unforgettable family travel experiences and custom tour packages across India with MIMI Family Tour, your trusted travel partner.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  // const isLoading = useNavigationLoading(1200)
  return (
    <html lang="en">
      <body
        className={`flex flex-col  bg-gradient-to-b from-amber-100 via-white  to-amber-100 text-white overflow-x-clip ${poppins.variable} `}
        suppressHydrationWarning={true}
      >
        <SessionWrapper>
          <Suspense
            fallback={
              <div className="h-screen w-screen flex items-center justify-center text-2xl sm:text-3xl">
                Loading...
              </div>
            }
          >
            {" "}
            <NavigationProvider minLoadingTime={1200}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                className="custom-toast-container"
              />
              <HeaderMenu />
              {/* <div className="absolute h-10 inset-0 z-9999 text-2xl"> {String(isLoading)}</div> */}

              <div className="main min-h-screen text-white ">{children}</div>

              <Footer />
            </NavigationProvider>
          </Suspense>
        </SessionWrapper>
      </body>
    </html>
  );
}
