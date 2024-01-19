"use client"

import { useImagineContext } from "@lib/context/imagine-context"
import calculateCredits from "@lib/util/calculate-credits"
import { saveAs } from "file-saver"

import { sleep } from "@lib/util/sleep"

import Button from "@shared/Button/Button"
import ButtonPrimary from "@shared/Button/ButtonPrimary"
import FullWidthImage from "@shared/FullWidthImage"
import ImageDropZone from "@shared/ImageDropZone"
import Input from "@shared/Input"
import ProgressBar from "@shared/ProgressBar"
import getProgressBarText from "@shared/ProgressBar/ProgressBarText"
import Select from "@shared/Select"
import Spinner from "@shared/icon/spinner"
import clsx from "clsx"

import Link from "next/link"
import { SetStateAction, useEffect, useState } from "react"

const MJ_ROUTER = "/api/mymidjourney"
const ENABLE_TOKEN_PAYMENT =
  process.env.NEXT_PUBLIC_ENABLE_TOKEN_PAYMENT === "true"
const ENABLE_IMAGE_TO_IMAGE =
  process.env.NEXT_PUBLIC_ENABLE_IMAGE_TO_IMAGE === "true"

export default function StepPrompt({ session }: { session: any }) {
  const [imagineProgress, setImagineProgress] = useState<number>(0)

  const [variant, setVariant] = useState<string | null>(null)
  const [upscale, setUpscale] = useState<string | null>(null)
  const [upscaling, setUpscaling] = useState<boolean>(false)
  const [isChanging, setIsChanging] = useState<boolean>(false)

  const reset = () => {
    setVariant(null)
    setUpscale(null)
    setUpscaling(false)
    setIsChanging(false)
    setImagineProgress(0)
  }

  const {
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
  } = useImagineContext()

  useEffect(() => {
    if (session) {
      const { remaining, total } = calculateCredits(session)
      setRemainingToken(remaining)
      setTotalToken(total)
    }
  }, [session, setRemainingToken, setTotalToken])

  const getImagineProgress = async (messageId: string) => {
    const response = await fetch(`${MJ_ROUTER}?action=message`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId,
      }),
    })
    const imagine = await response.json()
    if (response.status !== 200) {
      setError("Error getting progress")
      setLoading(false)
      return
    }
    setImagineProgress(imagine.progress)
    if (imagine.progress === 100) {
      setAiImage(imagine.uri)
      setMessageId(messageId)
      remainingToken && setRemainingToken(remainingToken - 1)
    }
    return imagine
  }

  const handleImagine = async () => {
    reset()
    resetImagine()
    setLoading(true)

    if (!prompt) {
      setError("Please enter a prompt")
      setLoading(false)
      return
    }
    let progress = 0
    let mjPrompt = prompt
    if (artist) {
      mjPrompt = `${mjPrompt}, by ${artist.trim()}`
    }
    if (style) {
      mjPrompt = `${mjPrompt}, ${style.trim().replace(" style", "")} style`
    }
    if (aspectRatio) {
      mjPrompt = `${mjPrompt}, --ar ${aspectRatio}`
    }
    if (referenceImage) {
      mjPrompt = `${referenceImage} ${mjPrompt}`
    }
    const response = await fetch(`${MJ_ROUTER}?action=imagine`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: mjPrompt,
      }),
    })

    const data = await response.json()
    if (response.status !== 200) {
      setError(data.error || "Error creating image")
      setLoading(false)
      return
    }

    while (progress < 100) {
      await sleep(1000)
      const imagine = await getImagineProgress(data.messageId)
      progress = imagine.progress
    }

    setLoading(false)
  }

  const handleButton = async (button: string) => {
    setError(null)
    let progress = 0
    const response = await fetch(`${MJ_ROUTER}?action=button`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId,
        button,
      }),
    })

    const data = await response.json()
    if (response.status !== 200) {
      setError(data.error || "Error changing image")
      setIsChanging(false)
      return
    }

    while (progress < 100) {
      await sleep(1000)
      const imagine = await getImagineProgress(data.messageId)
      progress = imagine.progress
    }

    setIsChanging(false)
  }

  const handleChangeVariant = () => {
    if (variant) {
      setIsChanging(true)
      setImagineProgress(0)
      handleButton(variant)
    }
  }

  const handleNext = async () => {
    if (!upscaled) {
      setUpscaling(true)
      await handleButton(upscale || "U1")
      setUpscaling(false)
    } else {
      aiImage && saveAs(aiImage, "image.webp")
    }
    if (error) {
      setUpscaling(false)
    } else {
      setUpscaled(true)
    }
  }

  return (
    <div className="mb-8 flex flex-col sm:flex-row">
      {/* left column */}
      <div className="flex flex-col bg-slate-100 p-4 dark:bg-slate-800 sm:w-6/12 md:w-4/12">
        <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Prompt *
        </h3>
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          placeholder="Please describe what you want to draw"
          className="mb-2 block w-full rounded-2xl border-0 border-neutral-200 bg-white p-2 px-4 py-1.5 text-sm font-normal shadow-sm ring-1 ring-inset ring-gray-300 focus:border-indigo-300 focus:ring focus:ring-inset focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-indigo-600 dark:focus:ring-opacity-25 dark:disabled:bg-neutral-800 sm:text-sm sm:leading-6"
          disabled={loading}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="my-2">
          <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Aspect Ratio
          </h3>
          <div className="flex w-full flex-col text-xs">
            <div className="flex flex-row flex-wrap">
              <div
                className={clsx(
                  "mb-2 mr-1 flex flex-1 flex-shrink-0 cursor-pointer flex-col items-center rounded-md border-2 p-1",
                  {
                    "border-indigo-500": aspectRatio === "1:1",
                  }
                )}
                onClick={() => setAspectRatio("1:1")}
              >
                <div className="flex-shrink-0 whitespace-nowrap">1:1</div>
                <div className="text-muted mt-0.5 flex-shrink-0 whitespace-nowrap">
                  Avatar
                </div>
              </div>
              <div
                className={clsx(
                  "mb-2 mr-1 flex flex-1 flex-shrink-0 cursor-pointer flex-col items-center rounded-md border-2 p-1",
                  {
                    "border-indigo-500": aspectRatio === "3:4",
                  }
                )}
                onClick={() => setAspectRatio("3:4")}
              >
                <div className="flex-shrink-0 whitespace-nowrap">3:4</div>
                <div className="text-muted mt-0.5 flex-shrink-0 whitespace-nowrap">
                  Poster
                </div>
              </div>
              <div
                className={clsx(
                  "mb-2 mr-1 flex flex-1 flex-shrink-0 cursor-pointer flex-col items-center rounded-md border-2 p-1",
                  {
                    "border-indigo-500": aspectRatio === "4:3",
                  }
                )}
                onClick={() => setAspectRatio("4:3")}
              >
                <div className="flex-shrink-0 whitespace-nowrap">4:3</div>
                <div className="text-muted mt-0.5 flex-shrink-0 whitespace-nowrap">
                  Photo
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Artist (optional)
          </h3>
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            We support styles from over 1000{" "}
            <Link
              href="https://midlibrary.io/categories/painters"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-600"
            >
              painters
            </Link>
            ,{" "}
            <Link
              href="https://midlibrary.io/categories/designers"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-600"
            >
              designers
            </Link>
            ,{" "}
            <Link
              href="https://midlibrary.io/categories/illustrators"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-600"
            >
              illustrators
            </Link>
            ,{" "}
            <Link
              href="https://midlibrary.io/categories/photographers"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-600"
            >
              photographers
            </Link>
            ,{" and "}
            <Link
              href="https://midlibrary.io/categories/various-artists"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Artists
            </Link>
            {`. Please put the name of an artist you would like to see. E.g.
            "Vincent van Gogh". You can also put multiple artists separated by a
            ",". E.g. "Vincent van Gogh, Pablo Picasso".`}
          </div>
          <Input
            name="artist"
            inline
            label="Enter an artist name"
            onChange={(e: { target: { value: string } }) =>
              setArtist(e.target.value)
            }
          />
        </div>
        <div className="my-2">
          <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Styles (optional)
          </h3>
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            We support over 200{" "}
            <Link
              href="https://midlibrary.io/categories/techniques"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-600"
            >
              styles
            </Link>
            {`. Please put the name of an style you would like to see. E.g.
            "Acrylic paint", you can also put multiple styles separated by a
            ",". E.g. "Acrylic paint, Oil paint".`}
          </div>
          <Input
            name="style"
            inline
            label="Enter an style name"
            onChange={(e: { target: { value: string } }) =>
              setStyle(e.target.value)
            }
          />
        </div>
        {ENABLE_IMAGE_TO_IMAGE && (
          <div className="my-2">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Reference Image (optional)
            </h3>
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Upload a reference image to help the A.I. generate your painting.
              The A.I. will try to match the style and content of the reference
              image.
            </div>
            <ImageDropZone
              image={referenceImage}
              setImage={setReferenceImage}
              setError={setError}
            />
          </div>
        )}
        <div className="flex-grow" />

        {ENABLE_TOKEN_PAYMENT && (
          <div className="items-middle flex justify-center rounded-lg bg-indigo-200 p-4 text-sm dark:bg-indigo-700">
            {session.isLoading ? (
              <Spinner />
            ) : (
              totalToken !== null &&
              remainingToken !== null && (
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>Remaining credit:</div>
                    <div className="font-semibold">{remainingToken}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Total credit:</div>
                    <div>{totalToken}</div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
        <div className="flex flex-col items-start">
          <ButtonPrimary
            className="my-2 w-full"
            onClick={handleImagine}
            loading={loading}
            disabled={
              loading ||
              (ENABLE_TOKEN_PAYMENT && remainingToken === 0) ||
              !prompt
            }
          >
            Generate Art
          </ButtonPrimary>
        </div>
      </div>
      {/* right column */}
      <div
        className={clsx(
          "flex items-center justify-center bg-slate-100 p-4 dark:bg-slate-800 sm:ml-4 sm:w-6/12 md:w-8/12",
          {
            "flex-col": aiImage || error,
          }
        )}
      >
        {aiImage ? (
          <div className="w-full py-8 md:px-10 md:py-0 lg:px-20">
            <div className="flex flex-1 text-sm font-medium">
              <div
                className={clsx("mr-4 flex flex-col justify-around", {
                  invisible: upscaled,
                })}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                  1
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                  3
                </div>
              </div>
              <FullWidthImage
                alt="Room Picture"
                src={aiImage}
                imageRatio={aspectRatio}
                isLoading={isChanging}
                loadingOverlay={
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center backdrop-blur-sm backdrop-brightness-50">
                    <div className="md:text-md absolute top-1/2 text-sm font-bold text-gray-200 lg:text-lg">
                      {getProgressBarText(imagineProgress)}
                    </div>
                    <div className="absolute top-1/2 mt-8 w-full px-8">
                      <ProgressBar className="" progress={imagineProgress} />
                    </div>
                  </div>
                }
              />
              <div
                className={clsx("ml-4 flex flex-col justify-around", {
                  invisible: upscaled,
                })}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                  2
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                  4
                </div>
              </div>
            </div>
            {!upscaled && (
              <>
                <div className="mt-4 flex flex-col items-end justify-center gap-y-4 md:flex-row">
                  <div className="flex-1">
                    <Select
                      label="Select a painting you want to regenerate (optional)"
                      onChange={(variant: SetStateAction<string | null>) =>
                        setVariant(variant)
                      }
                      options={[
                        {
                          id: "none",
                          label: "None",
                          value: null,
                        },
                        {
                          id: "v1",
                          label: "The 1st Painting",
                          value: "V1",
                        },
                        {
                          id: "v2",
                          label: "The 2nd Painting",
                          value: "V2",
                        },
                        {
                          id: "v3",
                          label: "The 3rd Painting",
                          value: "V3",
                        },
                        {
                          id: "v4",
                          label: "The 4th Painting",
                          value: "V4",
                        },
                      ]}
                    />
                  </div>
                  <Button
                    onClick={handleChangeVariant}
                    className="ml-3 flex !h-9 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-200/70 px-4 !text-sm !font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    loading={isChanging}
                  >
                    Regenerate
                  </Button>
                </div>
                <div className="mt-4 flex flex-col items-end justify-center gap-y-4 md:flex-row">
                  <div className="w-full">
                    <Select
                      label="Select a painting you would like to continue"
                      onChange={(upscale: SetStateAction<string | null>) =>
                        setUpscale(upscale)
                      }
                      options={[
                        {
                          id: "u1",
                          label: "The 1st Painting",
                          value: "U1",
                        },
                        {
                          id: "u2",
                          label: "The 2nd Painting",
                          value: "U2",
                        },
                        {
                          id: "u3",
                          label: "The 3rd Painting",
                          value: "U3",
                        },
                        {
                          id: "u4",
                          label: "The 4th Painting",
                          value: "U4",
                        },
                      ]}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex w-full py-8 md:px-10 md:py-0 lg:px-20">
            <div className="mr-4 h-8 w-8" />
            <div
              className={clsx(
                "relative flex w-full justify-center rounded-3xl bg-slate-50 dark:bg-slate-300",
                {
                  "animate-pulse": loading,
                }
              )}
              style={{
                paddingTop: `${
                  (parseInt(aspectRatio.split(":")[1], 10) /
                    parseInt(aspectRatio.split(":")[0], 10)) *
                  100
                }%`,
              }}
            >
              <div className="md:text-md absolute top-1/2 text-sm font-bold text-gray-400 dark:text-gray-500 lg:text-lg">
                {loading || isChanging
                  ? getProgressBarText(imagineProgress)
                  : "Your imagination awaits"}
              </div>
              {(loading || isChanging) && (
                <div className="absolute top-1/2 mt-8 w-full px-8">
                  <ProgressBar className="" progress={imagineProgress} />
                </div>
              )}
            </div>
            <div className="ml-4 h-8 w-8" />
          </div>
        )}

        {error && (
          <div className="w-full md:px-10 lg:px-20">
            <div className="mx-12 mt-4 rounded-3xl bg-rose-50 p-8 text-rose-600 ">
              {error}
            </div>
            {ENABLE_TOKEN_PAYMENT && error === "No API quota left" && (
              <ButtonPrimary className="float-right mx-12 mt-4 p-8">
                Get more credit
              </ButtonPrimary>
            )}
          </div>
        )}
        <div className="flex-grow" />
        {aiImage && (
          <div className="mt-2 flex w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <ButtonPrimary
                className="my-2 w-auto"
                onClick={handleNext}
                loading={upscaling}
                disabled={
                  upscaling || (ENABLE_TOKEN_PAYMENT && remainingToken === 0)
                }
              >
                {upscaling
                  ? "Upscaling the selected painting"
                  : ENABLE_TOKEN_PAYMENT && remainingToken === 0
                  ? "No enough credit"
                  : upscaled
                  ? "Download"
                  : "Upscale"}
              </ButtonPrimary>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
