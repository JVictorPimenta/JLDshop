import axios from 'axios'

const API = axios.create({
  baseURL: 'https://fakestoreapi.com'
})

export const getProducts = (limit) => API.get('/products' + (limit ? `?limit=${limit}` : ''))
export const getProduct = (id) => API.get(`/products/${id}`)
export default API
