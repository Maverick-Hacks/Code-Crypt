import { fontPoppinsMedium } from '@/config/fonts'
import { Button } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Billboard() {
  return (
    <div className={'overflow-hidden ' + fontPoppinsMedium.className}>
      <div
        style={{
          backgroundImage: `url(${'https://res.cloudinary.com/ds0jehrpk/image/upload/v1700829113/codecrypt/jvkbvmznpx8pddmpliga.jpg'})`,
        }}
        className='relative aspect-square overflow-hidden bg-cover md:aspect-[2.4/1] lg:aspect-[3.2/1]'
      >
        <div className='absolute inset-0'>
          <div className='flex h-full flex-col items-center justify-center text-center text-3xl font-bold text-white first-letter:max-w-xs sm:max-w-xl sm:text-5xl lg:text-6xl'>
            <div className='flex flex-col items-start'>
              <p>FIND</p>
              <p>YOUR</p>
              <p>FASHION</p>
            </div>
            <div className='w-full'>
              <Link href='/chat'>
                <Button className='mt-6 w-[40%] bg-white text-lg font-medium'>
                  <p>FIND YOURS</p>
                  <ChevronRight className='ml-2' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
