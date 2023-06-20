"use client"
import "tw-elements/dist/css/tw-elements.min.css";
import 'remixicon/fonts/remixicon.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import HeaderLandingScreen from "@/components/shared/HeaderLandingScreen";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { LookupProvider } from "@/contexts/lookupcontext";
import Footer from "@/components/shared/Footer";
import Nav from "@/components/shared/Nav/Nav";
import Sidebar from "@/components/shared/UI/Sidebar";

export default function RootLayout({ children }) {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <LookupProvider>
          <ToastContainer />
          {/* <Nav /> */}
          {/* <HeaderLandingScreen /> */}

          <ProtectedRoute router={router} pathname={pathname}>
            {

              ["/login", "/register", "/forgot-password", "/register/patient"].includes(pathname) ?
                children :
                <Sidebar path={pathname}>
                  {children}
                </Sidebar>
            }
          </ProtectedRoute>
          <Footer />
        </LookupProvider>
      </body>
    </html>
  )
}
