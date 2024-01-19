import cn from "clsx"
import { FC } from "react"

type ProgressBarProps = {
  progress: number
  className?: string
}

const ProgressBar: FC<ProgressBarProps> = ({ progress = 0, className }) => {
  // keep 0 decimal places for progress
  progress = Math.round(progress)
  return (
    <div
      className={cn(
        className,
        "w-full rounded-full bg-gray-200 dark:bg-gray-700"
      )}
    >
      <div
        className={cn(
          "flex rounded-full bg-indigo-500 p-0.5 text-xs font-medium leading-none",
          {
            "justify-center": progress === 100,
            "justify-end": progress < 100,
          }
        )}
        style={{ width: `${progress}%`, minWidth: "4.5rem" }}
      >
        <div className="ml-1 p-1 text-gray-200">
          {progress === 0
            ? "Starting..."
            : progress === 100
            ? "Done"
            : `${progress}%`}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
