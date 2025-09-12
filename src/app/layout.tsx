import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
// import Sidebar from "@/components/layout/Sidebar";

// Existing fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// New Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Play Pro | Ultimate Football Experience",
  description:
    "Play Pro is your all-in-one football app for live scores, match updates, news, player stats, and league standings. Stay ahead of the game, anytime, anywhere.",
  keywords: [
    "football app",
    "Play Pro",
    "live football scores",
    "football news",
    "match updates",
    "player stats",
    "football leagues",
    "soccer app",
  ],
  authors: [{ name: "Play Pro Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtsl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} relative font-sans antialiased`}
      >
        {/* ✅ Google Translate Script */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* ✅ Init Script */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'ar',
                includedLanguages: 'en,ar',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>

        <Script id="whatsapp-widget-init" strategy="afterInteractive">
          {`
              var url = 'https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?95632';
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = url;

              var options = {
                "enabled": true,
                "chatButtonSetting": {
                  "backgroundColor": "#00e785",
                  "ctaText": "Chat with us",
                  "borderRadius": "25",
                  "marginLeft": "0",
                  "marginRight": "20",
                  "marginBottom": "20",
                  "ctaIconWATI": false,
                  "position": "right"
                },
                "brandSetting": {
                  "brandName": "Wayone",
                  "brandSubTitle": "undefined",
                  "brandImg": "https://playprodammam.com/assets/images/logo.png",
                  "welcomeText": "Hi there!\\nHow can I help you?",
                  "messageText": "Hello, I have query ",
                  "backgroundColor": "#00e785",
                  "ctaText": "Chat with us",
                  "borderRadius": "25",
                  "autoShow": false,
                  "phoneNumber": "+966500330888"
                }
              };

              s.onload = function () {
                CreateWhatsappChatWidget(options);
              };

              var x = document.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            `}
        </Script>
        <Navbar />
        {/* <Sidebar /> */}
        <div className="min-h-screen flex">
          {/* <Sidebar /> */}
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        <div id="modal-root"></div>
        <ToastContainer
          rtl={false}
          autoClose={2000}
          newestOnTop={true}
          position="top-right"
          hideProgressBar={false}
        />
      </body>
    </html>
  );
}

// Revalidate the page every 15 minutes (900 seconds)
// This ensures that the page content is updated periodically
// without needing to redeploy the application.
export const revalidate = 300;