import { useQuery, useQueryClient } from 'react-query'
import { getProducts } from '../api/apiRoutes'
import { useState } from 'react'
import ProductModal from './ProductModal'
import Filter from './Filter'

const Products = () => {
  const { products, setProducts } = useState('')
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({ name: 'Dina' })

  const [searchValue, setSearchValue] = useState('')

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
  let filteredProducts = null

  if (searchValue) {
    filteredProducts = data.filter(product =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    console.log(filteredProducts)
  }

  let items
  filteredProducts ? (items = filteredProducts) : (items = data)
  return (
    <>
      <Filter setSearchValue={setSearchValue} />
      <ProductModal
        open={open}
        setOpen={setOpen}
        selectedProduct={selectedProduct}
      />

      {/* <div>
        <label
          for="search"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Search
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search"
          />
        </div>
      </div> */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.image}
                    // alt={item.imageAlt}
                    className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.price}
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
