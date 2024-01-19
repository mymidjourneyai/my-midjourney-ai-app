import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { ErrorMessage } from "@hookform/error-message"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  inline?: boolean
  rounded?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      errors,
      touched,
      required,
      inline = false,
      placeholder,
      rounded = "rounded-2xl",
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name) && get(touched, name)

    return (
      <div>
        <div className="relative z-0 w-full text-base">
          <label
            htmlFor={`id-${name}`}
            onClick={() => inputRef.current?.focus()}
            className="relative block"
          >
            {!inline && (
              <span
                className={clsx(
                  "mb-1 block text-neutral-800 dark:text-neutral-200",
                  {
                    "!text-rose-500": hasError,
                  }
                )}
              >
                {required ? `${label} *` : label}
              </span>
            )}

            <input
              type={inputType}
              id={`id-${name}`}
              name={name}
              placeholder={inline ? label : placeholder}
              className={clsx(
                `block h-11 w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-indigo-600 dark:focus:ring-opacity-25 dark:disabled:bg-neutral-800 ${rounded}`,
                {
                  "border-rose-500 focus:border-rose-500": hasError,
                }
              )}
              {...props}
              ref={inputRef}
            />

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-[37px] px-4 text-gray-400 outline-none transition-all duration-150 focus:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6" />
                )}
              </button>
            )}
          </label>
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
