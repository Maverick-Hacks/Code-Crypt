import { products } from '@/data/products'
import ProductDetails from './components/ProductDetails'

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = products.find((product) => product.id === params.id) || null;
  return (product != null ?
    <ProductDetails product={product} />
    : <div>Product not found</div>
  )
}

export default ProductPage
