"use client"

import Button, { ButtonProps } from "@shared/Button/Button"
import React from "react"

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary bg-slate-900 text-slate-50 shadow-xl hover:bg-slate-800  disabled:bg-slate-900/50 disabled:bg-opacity-90 dark:bg-slate-100 dark:text-slate-800 dark:hover:bg-slate-900 dark:hover:text-slate-50 disabled:dark:bg-slate-100/50 ${className}`}
      {...args}
    />
  )
}

export default ButtonPrimary
