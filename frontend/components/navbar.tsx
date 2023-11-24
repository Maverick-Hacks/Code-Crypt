import React from 'react'
import { HeartIcon, Search, ShoppingCart, User } from 'lucide-react'
import { fontPoppins, fontPoppinsBold, fontPoppinsMedium } from '@/config/fonts'
import Link from 'next/link'
import { Input, Button } from '@nextui-org/react'

const routes = [
  {
    label: 'Shop',
    href: '/',
    disabled: false,
  },
  {
    label: 'Clothing',
    href: '/clothing',
    disabled: false,
  },
  {
    label: 'Beauty',
    href: '/beauty',
    disabled: false,
  },
  {
    label: 'Furniture',
    href: '/furniture',
    disabled: false,
  },
  {
    label: 'Grocery',
    href: '/grocery',
    disabled: false,
  },
]

export default function NavBar() {
  return (
    <div className='flex h-24 w-full items-center justify-between gap-8 border-b bg-white px-24 py-8'>
      {/* <Image src={Logo} width={100} height={50} alt='Logo' /> */}
      <h2 className={fontPoppinsBold.className + ' text-2xl'}>Green4U</h2>
      <div className={fontPoppins.className + ' flex gap-8'}>
        {routes.map((route) => (
          <Link href={route.href} key={route.label} className='text-lg font-medium text-[#807D7E]'>
            {route.label}
          </Link>
        ))}
      </div>
      <div className='flex items-center gap-4'>
        <div>
          <Input
            type='text'
            placeholder='Search'
            startContent={<Search className='pointer-events-none h-5 flex-shrink-0 text-2xl text-default-400' />}
            size='md'
            variant='faded'
          />
        </div>
        <div className='flex gap-4'>
          <Button isIconOnly color='default' aria-label='Like'>
            <HeartIcon />
          </Button>
          <Button isIconOnly color='default' aria-label='Like'>
            <User />
          </Button>
          <Button isIconOnly color='default' aria-label='Like'>
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  )
}
