import Link from "next/link"

const Footer = () => {
  return (
    <footer className="nc-Footer fixed bottom-0 w-full bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700">
      <div className="container flex flex-col gap-y-8 py-4">
        <div className="flex flex-col justify-between items-center gap-y-6 sm:flex-row">
          <Link href="/" className="text-xl-semi uppercase">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </Link>
          <div className="grid grid-flow-row grid-cols-1 text-sm gap-x-4 flex-row">
            <div className="underline underline-offset-4">
              <a
                href="https://mymidjourney.ai/"
                target="_blank"
                rel="noreferrer"
              >
                Midjourney API
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center gap-y-4 sm:flex-row sm:items-end sm:justify-between">
          <span className="text-xsmall-regular text-gray-500">
            © Copyright 2023
          </span>
          <div className="flex min-w-[316px] sm:justify-end">
            {/* TODO: place for lang selector */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
