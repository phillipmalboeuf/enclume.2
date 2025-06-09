import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { Parallax } from '@/components/parallax'
import Script from 'next/script'

import 'normalize.css'
import 'flickity/css/flickity.css'
import '@/styles/styles.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' type='image/svg' href='https://images.ctfassets.net/esgvtsxg5drv/48cQ9HTqCIWni53SZ3k5XO/93cf6a14580867f6f3ab852088c1ad4f/favicon.svg' />
      </head>
      <body>
        <Loading />
        <Header locale={process.env.LOCALE} />
        {children}
        <Footer />
        <Parallax />

        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="afterInteractive"  />
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-07JJHETBP8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-07JJHETBP8');
          `}
        </Script> */}
      </body>
    </html>
  )
}
