import { Playfair_Display, Barlow_Condensed } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
})

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "Urban Class",
  description: "Prendas exclusivas en Valledupar",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  )
}