import Axios from 'axios'

export * from './endpoints'

export const api = Axios.create({
  baseURL: `https://100500.uz/v2/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
