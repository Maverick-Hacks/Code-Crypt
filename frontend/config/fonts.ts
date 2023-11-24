<<<<<<< HEAD
import { Fira_Code as FontMono, Inter as FontSans, Poppins as FontPoppins } from "next/font/google"
=======
import { Fira_Code as FontMono, Inter as FontSans, Poppins as FontPoppins } from 'next/font/google'
>>>>>>> dev

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const fontPoppins = FontPoppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const fontPoppinsBold = FontPoppins({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-poppins-bold',
})

export const fontPoppinsMedium = FontPoppins({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-poppins-medium',
})

export const fontPoppinsLight = FontPoppins({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-poppins-light',
})

export const fontPoppins = FontPoppins({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "700"
})
