'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@nextui-org/react'
import { Product } from '@/types'
import useCart from '@/hooks/use-cart'

interface InfoProps {
  data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const onAddToCart = () => {
    cart.addItem(data)
  }

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <div> {data?.price}</div>
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex flex-col gap-y-6'>
        {/*  */}
        <div className='flex flex-col gap-6'>
          <div className='flex gap-2'>
            <h3 className='font-semibold text-black'>Description:</h3>
            <div>{data?.description}</div>
          </div>
          <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>Size:</h3>
            <div>{data?.size}</div>
          </div>
          <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>Color:</h3>
            <div className='h-6 w-6 rounded-full border border-gray-600' style={{ backgroundColor: '#000000' }} />
          </div>
        </div>
        <div className='mt-10 flex items-center gap-x-3'>
          <Button onClick={onAddToCart} className='flex items-center gap-x-2'>
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Info
