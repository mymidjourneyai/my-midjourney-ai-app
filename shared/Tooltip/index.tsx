import { Popover, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { usePopper } from "react-popper"

type TooltopProps = {
  label: string
  tip: React.ReactNode
  icon?: React.ReactNode
}

export default function Tooltip({ label, tip, icon }: TooltopProps) {
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <div className="inline-block">
      <Popover className="relative z-10">
        {({ open }) => (
          <>
            <Popover.Button
              // @ts-ignore
              ref={setReferenceElement}
              className={`
                ${open ? "" : "text-opacity-90"}
                whitespace-break-spaces text-indigo-500 `}
            >
              <div className="flex flex-row items-center underline underline-offset-2">
                <span className="mr-1">{label}</span>
                {icon}
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                // @ts-ignore
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                <div className="flex w-[360px] flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-200 p-3 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-700">
                  {tip}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
