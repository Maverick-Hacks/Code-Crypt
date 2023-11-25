import axios from 'axios'
import ProductDetails from './components/ProductDetails'

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const products = (await axios.get('http://127.0.0.1:5000/products')).data.products

  const product = products.find((product) => product.id === params.id) || null
  return product != null ? <ProductDetails product={product} /> : <div>Product not found</div>
}

export default ProductPage
