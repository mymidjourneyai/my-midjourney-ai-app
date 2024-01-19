"use client"

import { Toaster } from "react-hot-toast"

const CommonClient = () => {
  return (
    <Toaster
      toastOptions={{
        className:
          "flex w-full max-w-xs text-sm sm:text-base items-center rounded-lg bg-white p-4 text-neutral-900 shadow dark:bg-gray-800 dark:text-neutral-200",
      }}
    />
  )
}

export default CommonClient
