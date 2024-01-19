"use client"

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import PlaceholderImage from "@images/painting-placeholder.png"
import { useImagineContext } from "@lib/context/imagine-context"

import Banner from "@shared/Banner"
import Button from "@shared/Button/Button"
import Tooltip from "@shared/Tooltip"
import { useRouter } from "next/navigation"
import StepPrompt from "./StepPrompt"

type ImagineProps = {
  session: any
}

const ENABLE_TOKEN_PAYMENT =
  process.env.NEXT_PUBLIC_ENABLE_TOKEN_PAYMENT === "true"

export default function Imagine({ session }: ImagineProps) {
  const { aiImage } = useImagineContext()
  const { push } = useRouter()

  const handleBuyCredit = () => {
    push("/credits")
  }

  return (
    <div className="pt-4">
      {session ? (
        <div className="container">
          <h2 className="my-4 mt-6 text-xl font-semibold !leading-[1.2] tracking-tight sm:my-6 sm:mt-10 sm:text-2xl xl:text-3xl 2xl:text-4xl">
            Create your own masterpiece...
          </h2>
          <div>
            <StepPrompt session={session} />

            {ENABLE_TOKEN_PAYMENT && (
              <div className="mb-8 flex flex-col items-center justify-between gap-x-4 px-4 sm:flex-row">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    <span className="font-semibold">Note:</span>
                    {` Please note that
                each A.I. painting generation, upscaling, or variation requires `}
                    <span className="font-semibold">1</span>
                    {` credit, which will be
                deducted from your account upon completion. `}
                    <Tooltip
                      label="why this"
                      icon={<QuestionMarkCircleIcon className="h-4 w-4" />}
                      tip={
                        <>
                          <p>
                            {`We're committed to providing you with top-notch
                          AI-generated artwork and image enhancements. To
                          maintain the highest quality and seamless experience,
                          we invest in cutting-edge AI resources and
                          infrastructure, including powerful GPU servers.`}
                          </p>
                          <p className="mt-4">
                            {`Each credit you use helps cover the cost of these
                          resources, ensuring that you receive the best possible
                          results. Your support enables us to continue offering
                          innovative, high-quality AI services that bring your
                          creative visions to life. Thank you for being a part
                          of our creative community!`}
                          </p>
                        </>
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handleBuyCredit}
                  className="mt-3 flex !h-9 w-48 min-w-[128px] items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-200/70 px-4 !text-sm !font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 sm:ml-3 sm:mt-0"
                >
                  Buy Credits
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container py-8 sm:py-16">
          <Banner
            headline="Artistry Unleashed"
            description="Experience the magic of AI as it transforms your vision into stunning artwork. Customize, visualize, and bring your creativity to life with our AI painting generation feature."
            buttonLabel="Login"
            buttonLink="/account/login"
            image={PlaceholderImage}
          />
        </div>
      )}
    </div>
  )
}
