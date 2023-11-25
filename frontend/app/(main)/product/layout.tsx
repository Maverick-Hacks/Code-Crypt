import { fontPoppins } from '@/config/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fontPoppins.className}>
      <div>{children}</div>
    </div>
  )
}
