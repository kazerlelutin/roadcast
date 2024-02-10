export function getResume(string, length) {
  const size = length || 50
  if (string.length <= size) return string
  return string.slice(0, size) + '...'
}
