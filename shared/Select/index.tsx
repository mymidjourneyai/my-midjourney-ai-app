import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import { Fragment, useState } from "react"

type Option = {
  id: string
  label: string
  value: string | null
}

export default function Select({
  label = "",
  onChange,
  options,
  className,
  defaultValue,
}: {
  label?: string
  onChange?: (value: string | null) => void
  options: Option[]
  className?: string
  defaultValue?: string | null
}) {
  let defaultOption = options[0]
  if (defaultValue) {
    // find the option with the default value
    defaultOption =
      options.find((option) => option.value === defaultValue) || options[0]
  }

  const [selected, setSelected] = useState<Option>(defaultOption)

  return (
    <Listbox
      value={selected}
      onChange={(option) => {
        onChange && onChange(option.value)
        setSelected(option)
      }}
    >
      {({ open }) => (
        <div className={className}>
          <Listbox.Label className="block text-sm font-medium leading-6 text-neutral-800 dark:text-neutral-200">
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md border-neutral-200 bg-white py-1.5 pl-3 pr-10 text-left text-sm font-normal shadow-sm ring-1 ring-inset ring-gray-300 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-neutral-200 dark:bg-neutral-900 dark:focus:ring-indigo-600 dark:focus:ring-opacity-25 dark:disabled:bg-neutral-800 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected?.label}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      clsx(
                        { "bg-indigo-600 text-white": active },
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={clsx(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option?.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
                              { "bg-indigo-600 text-white": active },
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
