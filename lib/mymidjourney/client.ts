import axios, { AxiosInstance } from "axios"

const MyMidjourneyClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_MIDJOURNEY_API_URL
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.MIDJOURNEY_API_KEY}`,
  }

  const client = axios.create({
    baseURL,
    headers,
    timeout: 10000,
  })

  return client
}

export default MyMidjourneyClient
