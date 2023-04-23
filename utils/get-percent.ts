export const getPercent = (value: number, total: number): number => {
  const percent = (value / total) * 100
  return percent
}
