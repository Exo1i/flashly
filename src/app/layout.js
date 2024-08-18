import {ClerkProvider} from '@clerk/nextjs'
import './globals.css'
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/next"

export default function RootLayout({
                                       children,
                                   }) {
    return (<ClerkProvider>
        <html lang="en">
            <body>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    </ClerkProvider>)
}