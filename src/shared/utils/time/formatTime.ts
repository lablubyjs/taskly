export const calculateTime = (time: number): string[] => {
  const hours: number = Math.floor(time / 3600)
  const minutes: number = Math.floor((time - hours * 3600) / 60)
  const seconds: number = time - hours * 3600 - minutes * 60

  return [
    hours < 10 ? `0${hours}` : `${hours}`,
    minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds < 10 ? `0${seconds}` : `${seconds}`,
  ]
}