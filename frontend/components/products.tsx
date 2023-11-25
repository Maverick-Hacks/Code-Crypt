'use client'

import React from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { fontPoppins } from '@/config/fonts'
import { ArrowRight } from 'lucide-react'

export default function Products() {
  const list = [
    {
      title: 'Shirt',
      img: 'https://img.freepik.com/free-photo/portrait-smiling-young-man-dressed-white-shirt_171337-17450.jpg?w=1060&t=st=1700873183~exp=1700873783~hmac=47cb678bda3f7b40a735027d3814b7fbc8eb6ac7be65398367877c1b96b04e81',
      price: 'Rs1999',
    },
    {
      title: 'Pants',
      img: 'https://img.freepik.com/free-photo/man-wearing-brown-pants-close-up_53876-102239.jpg?w=360&t=st=1700873296~exp=1700873896~hmac=9c8d35261f6d06a5c210652a1d8342b27528a98ff0de3e2df7951b450ee10a2a',
      price: 'Rs1499',
    },
    {
      title: 'Tops',
      img: 'https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?w=360&t=st=1700873340~exp=1700873940~hmac=cefceab76fb5a195f645fd1b89a532ff7f92e43c5fb4826172f66e9abc9576ee',
      price: 'Rs2499',
    },
    {
      title: 'Dresses',
      img: 'https://img.freepik.com/premium-photo/gorgeous-young-model-front-pose-showing-her-trending-kurta-pajama-dupatta-fashion-photoshoot_658768-184.jpg?w=360',
      price: 'Rs1999',
    },
    {
      title: 'Jackets',
      img: 'https://img.freepik.com/free-photo/portrait-handsome-confident-model-sexy-stylish-man-dressed-biker-leather-jacket-black-jeans-fashion-hipster-male-isolated-grey-background-studio-sunglasses-isolated_158538-23454.jpg?w=900&t=st=1700873447~exp=1700874047~hmac=890b6b05b7dc77b8d2865b082d76ac192e494f7114df1cf7fd7cfb56b980a5fc',
      price: 'Rs3999',
    },
    {
      title: 'Jeans',
      img: 'https://img.freepik.com/free-photo/man-navy-jacket-jeans-streetwear_53876-108579.jpg?w=360&t=st=1700873508~exp=1700874108~hmac=ff8f5ee8cf2ed3b07c1554c3be2e36a6c59638c28452097c00f516e8b5b2cc74',
      price: 'Rs2999',
    },
    {
      title: 'Skirts',
      img: 'https://img.freepik.com/free-photo/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-yellow-skirt-round-sunglasses-positive-female-shows-facial-emotions-funny-model-isolated-blue_158538-15844.jpg?w=900&t=st=1700873569~exp=1700874169~hmac=347475f8e1e20ffdb41cc292739829f7ea9b6efaafc2c014383e2498815c3864',
      price: 'Rs1299',
    },
    {
      title: 'Accessories',
      img: 'https://img.freepik.com/free-photo/top-view-accessoires-travel-with-man-clothing-concept-bow-tie-wallet-wooden-background-watch-sunglasses-bag-hat-belt-shoes-wood-table_1921-94.jpg?w=1060&t=st=1700873627~exp=1700874227~hmac=b52d64e0e7aaffe03352cab19a7938d9e1163b4c4af66d001a1c4949b83cc451',
      price: 'Rs2999',
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
                <p className='text-start text-lg font-bold'>{item.title}</p>
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
