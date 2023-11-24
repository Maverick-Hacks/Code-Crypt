import Billboard from '@/components/billboard'
import Products from '@/components/products'
import { Button } from '@nextui-org/button'

export default function Home() {
  return (
    <main className='space-y-4'>
      <Billboard />
      <Products />
    </main>
  )
}
