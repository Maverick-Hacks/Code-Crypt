'use client'

import IconButton from '@/components/icon-button'
import { fontPoppins } from '@/config/fonts'
import { Button, Input } from '@nextui-org/react'
import { ChevronRight, Delete, Loader, Loader2, RefreshCcw, Shuffle, Sparkles, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Product } from '@/types'
import ProductCard from '@/components/product-card'
import toast from 'react-hot-toast'
import axios from 'axios'

interface ProductProps {
  data: Product[]
}

export const Generate: React.FC<ProductProps> = ({ data }) => {
  const [products, setProducts] = useState<Product[]>()
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // setProducts(products)
    toast('Feature under development!', {
      icon: '🚧',
    })
  }
  return (
    <>
      <div onSubmit={handleSubmit}>
        <div className='flex items-center gap-2 lg:px-24'>
          <Input
            type='text'
            placeholder='What do you need today?'
            startContent={
              <div className='mr-8 flex gap-2'>
                <Sparkles />
                <p>/generate</p>
              </div>
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='placholder:pl-12'
          />
          <Button type='submit' variant='flat' onClick={handleSubmit}>
            Submit
            <ChevronRight />
          </Button>
          <IconButton
            icon={<Shuffle />}
            onClick={() => {
              setLoading(true)
              setTimeout(() => {
                setProducts(data.products)
                setLoading(false)
                toast.remove()
                toast.success('Products generated')
              }, 1500)
            }}
            className='w-9'
          />
          <IconButton
            icon={<Trash />}
            onClick={() => {
              setProducts([])
            }}
            className='w-9'
          />
        </div>
      </div>
      <div className='mt-12 lg:px-32'>
        {products && products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'>
            {/* <ProductGridItems products={products} /> */}
            {products?.map((product) => <ProductCard key={product.id} data={product} />)}
          </div>
        ) : loading ? (
          <div className='flex h-64  w-full items-center justify-center'>
            <Loader className='animate-spin' size={64} />
          </div>
        ) : (
          <div className='flex h-64  w-full items-center justify-center'>
            <p className='text-3xl font-bold'></p>
          </div>
        )}
      </div>
    </>
  )
}
