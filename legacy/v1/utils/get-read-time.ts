export function getReadTime(text: string): number {
  const wordsPerMinute = 200 * 0.5 // 200 words per minute, 50% of that
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return readTime
}
