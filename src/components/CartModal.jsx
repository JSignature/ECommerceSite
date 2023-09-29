import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const CartModal = ({ open, setOpen }) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (localStorage.getItem('cart') !== null) {
      setProducts(JSON.parse(localStorage.getItem('cart')))
      console.log(products)
    }
  }, [open])

  const handleRemove = id => {
    // Created a variable instead of running filter in the setter function, state was not clearing
    // This needs to be figured out
    console.log('Clicked Remove Button', id)
    const updatedArray = products.filter(product => product.id != id)
    console.log(updatedArray)
    setProducts(updatedArray)
    localStorage.setItem('cart', JSON.stringify(updatedArray))
  }

  const handleQty = (id, e) => {
    //array is being mutated consider changing
    products.find(product => product.id === id).qty = e.target.value
    localStorage.setItem('cart', JSON.stringify(products))
    setProducts(JSON.parse(localStorage.getItem('cart')))
  }

  const handleCheckOut = () => {
    localStorage.clear()
    navigate('/checkout')
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {!products ? (
                            <h1>Please add item</h1>
                          ) : (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {products.map(product => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.title}</h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div>
                                        <label for="qty">Quantity:</label>

                                        <select
                                          name="Qty"
                                          onChange={e =>
                                            handleQty(product.id, e)
                                          }
                                          defaultValue={product.qty}
                                        >
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                        </select>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-sky-600 hover:text-sky-500"
                                          onClick={() =>
                                            handleRemove(product.id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          ${' '}
                          {products
                            .map(product => product.qty * product.price)
                            .reduce((total, item) => total + item, 0)
                            .toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        {!products ? null : (
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700"
                            onClick={() => handleCheckOut()}
                          >
                            Checkout
                          </a>
                        )}
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-sky-600 hover:text-sky-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartModal
