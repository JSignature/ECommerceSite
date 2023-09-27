import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

const getProducts = async () => {
  const res = await api.get('/products')
  return res.data
}

const login = async user => {
  const res = await api.post('/auth/login', user)
  console.log(res)
  return res
}

export { getProducts, login }
