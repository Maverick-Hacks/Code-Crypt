'use client'

import React from 'react'
// import ProductList from '@/components/product-list'
import Gallery from '@/components/gallery'
import Info from '@/components/info'
import { Product } from '@/types/index'

interface ProductProps {
  product: Product
}

export const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl'>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.images} />
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info data={product} />
            </div>
          </div>
          <hr className='my-10' />
          {/* <ProductList title='Related Items' items={suggestedProducts} /> */}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
