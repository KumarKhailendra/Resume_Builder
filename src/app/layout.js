import { Inter } from "next/font/google";
import "../style/globals.css";
import DataProvider from "@/redux/store";
import { Toaster } from "react-hot-toast";
import SideBar from "@/components/SideBar";
import MUIThemeProvider from "./muiThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <DataProvider>
          <MUIThemeProvider>
            <SideBar>{children}</SideBar>
          </MUIThemeProvider>
        </DataProvider>
        <Toaster />
      </body>
    </html>
  );
}
