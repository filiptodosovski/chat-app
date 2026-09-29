import axios from 'axios'
import { getSession } from 'next-auth/react'

export const apiClient = axios.create()

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession()
  const token = session?.user?.accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
