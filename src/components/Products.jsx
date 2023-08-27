import { useQuery, useQueryClient } from 'react-query'
import { getProducts } from '../api/apiRoutes'
import { useState } from 'react'
import ProductModal from './ProductModal'

const Products = () => {
  const { products, setProducts } = useState('')
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({ name: 'Dina' })

  const { isLoading, isError, error, data } = useQuery('products', getProducts)

  function handleClick(product) {
    setOpen(true)
    setSelectedProduct(product)
  }

  if (isLoading) {
    return <h1>Loading</h1>
  } else if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <>
      <ProductModal
        open={open}
        setOpen={setOpen}
        selectedProduct={selectedProduct}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map(product => (
              <div
                key={product.id}
                onClick={() => handleClick(product)}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    // alt={product.imageAlt}
                    className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
