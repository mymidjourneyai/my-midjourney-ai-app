const getProgressBarText = (progress: number): string => {
  if (progress === 0) {
    return "Unleashing the power of A.I..."
  } else if (progress < 35) {
    return "Artisitic algorithms are awakening"
  } else if (progress < 65) {
    return "Intelligent strokes in progress"
  } else if (progress < 85) {
    return "Exploring the depths of creativity"
  } else {
    return "Final touches, almost there"
  }
}

export default getProgressBarText
