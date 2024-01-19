export const slugify = (text: string) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

export const ncNanoId = (prefix = "nc_") => {
  return (
    prefix +
    Date.now() +
    "_" +
    Math.floor(Math.random() * 999999999999999)
  ).substring(0, 8)
}

export const twFocusClass = (hasRing = false) => {
  if (!hasRing) {
    return "focus:outline-none"
  }
  return "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 dark:focus:ring-offset-0"
}

export const animationVariants = (x = 1000, opacity = 0) => ({
  enter: (direction: number) => {
    return {
      x: direction > 0 ? x : -x,
      opacity,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? x : -x,
      opacity,
    }
  },
})

export const isSafariBrowser = () => {
  // return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  return (
    navigator.userAgent.indexOf("Safari") > -1 &&
    navigator.userAgent.indexOf("Chrome") <= -1
  )
}
