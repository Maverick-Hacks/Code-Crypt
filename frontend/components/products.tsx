'use client'

import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { fontPoppins } from '@/config/fonts'
import { ArrowRight } from 'lucide-react'

export default function Products() {
  const list = [
    {
      title: 'Orange',
      img: '/products/demo.png',

      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/products/demo.png',
      price: '$3.00',
    },
    {
      title: 'Raspberry',
      img: '/products/demo.png',

      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/products/demo.png',

      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: '/products/demo.png',

      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/products/demo.png',

      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/products/demo.png',

      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/products/demo.png',

      price: '$12.20',
    },
  ]

  return (
    <div className='p-4'>
      <div className='mb-4 flex items-center space-x-4 pl-8'>
        <div className='h-6 w-[5px] bg-[#8A33FD]' />
        <h2 className='text-2xl font-bold'>Categories for Men</h2>
      </div>
      <div className={fontPoppins.className + ' grid grid-cols-2 gap-2 p-4 sm:grid-cols-4'}>
        {list.map((item, index) => (
          <div key={index} className='max-w-[273px] rounded-md p-2'>
            <div className='overflow-visible'>
              <Image width='100%' alt={item.title} className='aspect-[240/320]  object-cover' src={item.img} />
            </div>
            <div className='flex items-center justify-between text-small'>
              <div className='w-fullpx-2'>
                <p className='text-start text-lg font-bold'>{'Shirts'}</p>
                <p className='text-start text-zinc-600'>Explore Now</p>
              </div>
              <ArrowRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
