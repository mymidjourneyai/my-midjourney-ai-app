import backgroundLineSvg from "@images/Moon.svg"
import ButtonPrimary from "@shared/Button/ButtonPrimary"
import NcImage from "@shared/NcImage/NcImage"
import Image, { StaticImageData } from "next/image"
import { FC } from "react"

export interface SectionPromo2Props {
  className?: string
  image?: string | StaticImageData
  headline?: string
  description?: string
  buttonLabel?: string
  buttonLink?: string
}

const Banner: FC<SectionPromo2Props> = ({
  image,
  className = "lg:pt-10",
  buttonLabel,
  buttonLink,
  headline,
  description,
}) => {
  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div className="relative flex flex-col rounded-2xl bg-yellow-50 p-4 pb-0 dark:bg-slate-800 sm:rounded-[40px] sm:p-5 sm:pb-0 lg:flex-row lg:justify-end lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute h-full w-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="relative max-w-lg lg:w-[45%]">
          <h2 className="mt-6 text-3xl font-semibold !leading-[1.13] tracking-tight sm:mt-10 sm:text-4xl xl:text-5xl 2xl:text-6xl">
            {headline || "The best fashion shop"}
          </h2>
          <span className="mt-6 block text-slate-500 dark:text-slate-400">
            {description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique."}
          </span>
          {buttonLink && buttonLabel && (
            <div className="mt-6 flex space-x-2 sm:mt-12 sm:space-x-5">
              <ButtonPrimary
                href={buttonLink}
                className="dark:bg-slate-200 dark:text-slate-900"
              >
                {buttonLabel}
              </ButtonPrimary>
            </div>
          )}
        </div>

        {image && (
          <NcImage
            alt=""
            containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
            src={image}
            sizes="(max-width: 768px) 100vw, 50vw"
            className=""
          />
        )}
      </div>
    </div>
  )
}

export default Banner
