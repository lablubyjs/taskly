import { DateMatrix } from 'date-matrix'

export const sliceDateMatrix = (
  dateMatrix: DateMatrix,
  start: number,
  end: number
) => {
  const { weeks } = dateMatrix
  return weeks.slice(start, end)
}
