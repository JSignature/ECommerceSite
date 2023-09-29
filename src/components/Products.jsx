import { useQuery, useQueryClient } from 'react-query'
import { getProducts } from '../api/apiRoutes'
import { useState } from 'react'
import ProductModal from './ProductModal'
import Filter from './Filter'
import Sort from './Sort'
import CartModal from './CartModal'
import { NavLink } from 'react-router-dom'
import NavBar from './NavBar'

const Products = () => {
  const queryClient = useQueryClient()
  const [openProdModal, setOpenProdModal] = useState(false)
  const [openCartModal, setOpenCartModal] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState('')
  const [sortedSelection, setSortedSelection] = useState('')
  // console.log(sortedSelection)

  const [filterValue, setFilterValue] = useState('')

  const {
    isLoading,
    isError,
    error,
    data: allProducts,
  } = useQuery('products', getProducts)

  function handleClick(product) {
    setOpenProdModal(true)
    setSelectedProduct(product)
  }

  if (isLoading) {
    return <h1>Loading</h1>
  } else if (isError) {
    return <h1>{error.message}</h1>
  }
  let filteredProducts = null

  if (filterValue) {
    filteredProducts = allProducts.filter(product =>
      product.title.toLowerCase().includes(filterValue.toLowerCase())
    )
  }
  if (sortedSelection) {
    if (sortedSelection.name === 'Price Low to High') {
      allProducts.sort((a, b) => a.price - b.price)
    } else if (sortedSelection.name === 'Price High to Low') {
      allProducts.sort((a, b) => b.price - a.price)
    }
  }

  let products
  filteredProducts ? (products = filteredProducts) : (products = allProducts)
  return (
    <>
      <NavBar setOpenCartModal={setOpenCartModal} />
      <div class=" flex justify-around   ">
        <Filter setFilterValue={setFilterValue} />
        <Sort
          sortedSelection={sortedSelection}
          setSortedSelection={setSortedSelection}
        />
      </div>
      <ProductModal
        open={openProdModal}
        setOpen={setOpenProdModal}
        selectedProduct={selectedProduct}
        setOpenCartModal={setOpenCartModal}
      />
      <CartModal open={openCartModal} setOpen={setOpenCartModal} />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => handleClick(product)}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
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
                    ${product.price}
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
