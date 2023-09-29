import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ProductOverview from './ProductOverview'
import { useNavigate } from 'react-router-dom'

export default function Example({
  open,
  setOpen,
  selectedProduct,
  setOpenCartModal,
}) {
  const cancelButtonRef = useRef(null)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
  console.log('product modal is logged in', isLoggedIn)

  const navigate = useNavigate()

  function handleCartClick() {
    setOpen(false)
    setOpenCartModal(true)
    let currentItems
    console.log('handle cart click')

    if (localStorage.getItem('cart')) {
      if (
        JSON.parse(localStorage.getItem('cart'))
          .map(product => product.id)
          .includes(selectedProduct.id)
      ) {
        console.log('inside the if')
        const products = JSON.parse(localStorage.getItem('cart'))
        products.find(product => product.id === selectedProduct.id).qty += 1
        localStorage.setItem('cart', JSON.stringify(products))
      } else {
        currentItems = JSON.parse(localStorage.getItem('cart'))
      }
    } else {
      console.log('false')
      currentItems = []
    }
    console.log('completed the ifelse', currentItems)
    let updatedQtyProduct = selectedProduct
    updatedQtyProduct.qty = 1
    currentItems.push(updatedQtyProduct)
    console.log('after the push', currentItems)
    localStorage.clear()

    localStorage.setItem('cart', JSON.stringify(currentItems))
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <ProductOverview selectedProduct={selectedProduct} />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {isLoggedIn ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={handleCartClick}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => navigate('/login')}
                    >
                      Log In
                    </button>
                  )}

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
