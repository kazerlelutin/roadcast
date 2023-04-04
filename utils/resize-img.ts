interface ResizeImgProps {
  file: File
  maxWidth: number
  maxHeight?: number
}

export const resizeImg = ({
  file,
  maxWidth,
  maxHeight,
}: ResizeImgProps): Promise<{
  image: string
  imageWidth: number
  imageHeight: number
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const { width, height } = img
      canvas.width = width > maxWidth ? maxWidth : width
      canvas.height =
        width > maxWidth ? maxHeight || (height * maxWidth) / width : height
      if (!ctx) return reject('Canvas context is null')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve({
        image: canvas.toDataURL(),
        imageWidth: canvas.width,
        imageHeight: canvas.height,
      })
    }
    img.onerror = (error) => reject(error)
  })
}
