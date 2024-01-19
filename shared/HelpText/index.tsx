import type { ComponentProps, FC, PropsWithChildren } from "react"

interface HelperTextProps
  extends PropsWithChildren<Omit<ComponentProps<"p">, "color">> {
  value?: string
  color?: "default" | "info" | "failure" | "warning" | "success"
}

const HelperText: FC<HelperTextProps> = ({
  children,
  className,
  value,
  color = "default",
  ...props
}) => {
  if (color === "default") {
    className = `text-gray-500 dark:text-gray-400 ${className ?? ""}`
  } else if (color === "info") {
    className = `text-blue-500 dark:text-blue-400 ${className ?? ""}`
  } else if (color === "failure") {
    className = `text-red-500 dark:text-red-400 ${className ?? ""}`
  } else if (color === "warning") {
    className = `text-yellow-500 dark:text-yellow-400 ${className ?? ""}`
  } else if (color === "success") {
    className = `text-green-500 dark:text-green-400 ${className ?? ""}`
  }

  return (
    <p className={className} {...props}>
      {value ?? children ?? ""}
    </p>
  )
}

HelperText.displayName = "HelperText"

export default HelperText
