import { fontPoppins } from '@/config/fonts'
import { Generate } from './generate'
import axios from 'axios'

export default async function Chat() {
  const products = await axios.get('http://127.0.0.1:5000/products')

  return (
    <div className={fontPoppins.className + ' p-8'}>
      <Generate data={products.data} />
    </div>
  )
}
