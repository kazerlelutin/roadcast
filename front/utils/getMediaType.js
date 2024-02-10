export function getMediaType(mineType) {
  if (mineType.startsWith('image')) {
    return 'image'
  }

  if (mineType.startsWith('video')) {
    return 'video'
  }

  if (mineType.startsWith('audio')) {
    return 'audio'
  }

  return 'file'
}
