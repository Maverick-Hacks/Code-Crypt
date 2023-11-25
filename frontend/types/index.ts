import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export interface Product {
  id: string
  name: string
  price: string
  description: string
  category: string
  images: Image[]
  size: 'small' | 'medium' | 'large'
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'brown' | 'gray'
}

export interface Image {
  id: string
  url: string
}
