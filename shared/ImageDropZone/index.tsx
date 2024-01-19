import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Spinner from "@shared/icon/spinner"

import axios, { AxiosResponse } from "axios"
import Image, { StaticImageData } from "next/image"
import { useState } from "react"
import Dropzone from "react-dropzone"

type ImageDropZoneProps = {
  image: string | StaticImageData | null
  setImage: (url: string | StaticImageData | null) => void
  setError: (errorMessage: string | null) => void
  error?: string | null
  fileLimit?: number
  preview?: boolean
}

const BASEURL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"

const ImageDropZone = ({
  image,
  setImage,
  setError,
  fileLimit = 10,
  preview = true,
}: ImageDropZoneProps) => {
  const [uploading, setUploading] = useState<boolean>(false)

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      setError("Please select an image first!")
      return
    }

    const selectedFile = acceptedFiles[0]

    const formData = new FormData()
    formData.append("image", selectedFile)
    setUploading(true)
    try {
      const response: AxiosResponse = await axios.post(
        `${BASEURL}/store/file/upload`,
        formData,
        {
          withCredentials: true,
        }
      )

      if (response.data.imageUrl) {
        setImage(response.data.imageUrl)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      // @ts-ignore
      setError(error?.message || "Error uploading image")
      setUploading(false)
    }
    setUploading(false)
  }

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setImage(null)
  }

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{
        "image/*": [".png", ".gif", ".jpg", ".jpeg"],
      }}
      multiple={false}
      disabled={uploading}
      maxSize={fileLimit * 1024 * 1024}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4 dark:border-gray-50/25"
        >
          <div className="flex flex-col items-center text-center">
            {uploading ? (
              <Spinner />
            ) : image && preview ? (
              <div className="relative">
                <button
                  onClick={handleRemove}
                  className="absolute -right-2.5 -top-2.5 rounded-full border border-gray-500 bg-black p-1 text-white dark:border-gray-400 dark:bg-white dark:text-black"
                >
                  <XMarkIcon className="h-4 w-4 rounded-full " />
                </button>
                <Image
                  src={image}
                  alt="reference-image"
                  width={120}
                  height={120}
                />
              </div>
            ) : (
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
            )}
            <div className="mt-4 flex text-sm leading-6">
              <label className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload a file</span>
                <input {...getInputProps()} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

export default ImageDropZone
