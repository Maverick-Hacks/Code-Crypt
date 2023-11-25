import ProductCard from '@/components/product-card'
import { products as demoProducts } from '@/data/products'

export const runtime = 'edge'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  //   const products = await getProducts({ sortKey, reverse, query: searchValue })
  const products = demoProducts
  const resultsText = products.length > 1 ? 'results' : 'result'

  return (
    <>
      {products.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {/* <ProductGridItems products={products} /> */}
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      ) : null}
    </>
  )
}
