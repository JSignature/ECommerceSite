import { useState } from 'react'
import NavBar from './NavBar'
import { login } from '../api/apiRoutes'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
  const [username, setUsername] = useState('johnd')
  const [password, setPassword] = useState('m38rmF$')
  const navigate = useNavigate()

  const handleClick = async () => {
    const user = { username, password }

    const { data } = await login(user)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }
  return (
    <>
      <NavBar />
      <form className="flex justify-center flex-col items-center mt-20  ">
        {/* Username */}
        <h1>Please Enter Username and Password to sign in</h1>
        <div class="sm:col-span-4  mt-20">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md">
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="username"
                value={username}
              />
            </div>
          </div>
        </div>
        {/* password */}
        <div class="sm:col-span-4 mt-5">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 sm:max-w-md">
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="password"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="password"
                value={password}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-900 sm:ml-3 sm:w-auto mt-10"
          onClick={() => handleClick()}
        >
          Log in
        </button>
      </form>
    </>
  )
}

export default LogIn
