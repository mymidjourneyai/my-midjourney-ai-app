import { StaticImageData } from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

// Define the context shape
interface ImagineContextProps {
  aiImage: string | null
  loading: boolean
  error: string | null
  setAiImage: (url: string | null) => void
  setLoading: (status: boolean) => void
  setError: (errorMessage: string | null) => void
  messageId: string | null
  setMessageId: (messageId: string | null) => void
  resetImagine: () => void
  prompt: string
  setPrompt: (prompt: string) => void
  aspectRatio: string
  setAspectRatio: (aspectRatio: string) => void
  artist: string
  setArtist: (artist: string) => void
  style: string
  setStyle: (style: string) => void
  referenceImage: string | StaticImageData | null
  setReferenceImage: (url: string | StaticImageData | null) => void
  upscaled: boolean
  setUpscaled: (status: boolean) => void
  remainingToken: number
  setRemainingToken: (token: number) => void
  totalToken: number
  setTotalToken: (token: number) => void
}

// Create the context
const ImagineContext = createContext<ImagineContextProps | undefined>(undefined)

// Define a custom hook to access the context
export const useImagineContext = () => {
  const context = useContext(ImagineContext)
  if (!context) {
    throw new Error("useImagineContext must be used within an ImagineProvider")
  }
  return context
}

// Define the provider component
interface ImagineProviderProps {
  children: ReactNode
}

export const ImagineProvider: React.FC<ImagineProviderProps> = ({
  children,
}) => {
  // general
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<number>(
    parseInt(searchParams.get("step") || "1")
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [aspectRatio, setAspectRatio] = useState<string>("1:1")
  // for token
  const [remainingToken, setRemainingToken] = useState<number>(0)
  const [totalToken, setTotalToken] = useState<number>(0)

  // test ai image URL
  // https://cdn.discordapp.com/attachments/1121466923859845193/1144617095515086848/leizeng_A_little_cat_running_on_the_grass_3a38b40f-9354-461d-82cc-09c738e027a4.png
  const [aiImage, setAiImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [artist, setArtist] = useState<string>("")
  const [style, setStyle] = useState<string>("")
  const [referenceImage, setReferenceImage] = useState<
    string | StaticImageData | null
  >(null)
  const [messageId, setMessageId] = useState<string | null>(null)
  const [upscaled, setUpscaled] = useState<boolean>(false)

  useEffect(() => {
    if (searchParams.get("step")) {
      setStep(Number(searchParams.get("step")) || 1)
    }
  }, [searchParams])

  const resetImagine = () => {
    setAiImage(null)
    setLoading(false)
    setError(null)
    setMessageId(null)
    setUpscaled(false)
  }

  const contextValue = {
    aiImage,
    loading,
    error,
    setAiImage,
    setLoading,
    setError,
    messageId,
    setMessageId,
    resetImagine,
    prompt,
    setPrompt,
    aspectRatio,
    setAspectRatio,
    artist,
    setArtist,
    style,
    setStyle,
    referenceImage,
    setReferenceImage,
    upscaled,
    setUpscaled,
    remainingToken,
    setRemainingToken,
    totalToken,
    setTotalToken,
  }

  return (
    <ImagineContext.Provider value={contextValue}>
      {children}
    </ImagineContext.Provider>
  )
}
