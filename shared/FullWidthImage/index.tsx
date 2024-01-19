import Image, { StaticImageData } from "next/image"
import { ReactNode } from "react"
import styles from "./FullWidthImage.module.css" // Create a CSS module for styling

type FullWidthImageProps = {
  src: string | StaticImageData
  alt?: string
  className?: string
  imageRatio?: string
  isLoading?: boolean
  loadingOverlay?: ReactNode
}

const FullWidthImage = ({
  src,
  alt = "image title",
  className = "",
  imageRatio = "16:9",
  isLoading = false,
  loadingOverlay = null,
}: FullWidthImageProps) => {
  // padding-top: 56.25%; /* Maintain a 16:9 aspect ratio (9 / 16 * 100) */
  const paddingTop =
    (parseInt(imageRatio.split(":")[1], 10) /
      parseInt(imageRatio.split(":")[0], 10)) *
    100
  return (
    <div className={styles.fullWidthImage}>
      <div
        className={styles.imageWrapper}
        style={{ paddingTop: `${paddingTop}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: "cover" }}
          className={className}
        />
        {isLoading && loadingOverlay}
      </div>
    </div>
  )
}

export default FullWidthImage
