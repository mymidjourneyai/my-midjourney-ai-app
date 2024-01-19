import toast from "react-hot-toast"

export const handleError = (error: Error) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error)
    toast.error(error.message)
  } else {
    toast.error("Something went wrong") // TODO: proper error handling in production
  }
}
