/**
 * Client-side image compression for CV photos.
 * Reads an image file, downsizes it to a max dimension, and returns a
 * data URL that can be embedded in the resume (works in templates + PDF).
 */

const MAX_DIM = 512 // px on the longest side — plenty for a CV avatar
const JPEG_QUALITY = 0.82

export interface CompressResult {
  dataUrl: string
  width: number
  height: number
}

export function compressImageFile(file: File, maxDim = MAX_DIM): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file (JPG, PNG or WebP).'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the image file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not decode that image.'))
      img.onload = () => {
        // Downscale so the longest side is at most maxDim, keeping aspect ratio.
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const width = Math.max(1, Math.round(img.width * scale))
        const height = Math.max(1, Math.round(img.height * scale))

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas is not supported in this browser.'))
          return
        }
        // White background so transparent PNGs don't render black in the PDF.
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)

        // Prefer WebP when supported (smaller than JPEG at same quality).
        const type =
          canvas.toDataURL('image/webp').startsWith('data:image/webp') ? 'image/webp' : 'image/jpeg'
        const dataUrl = canvas.toDataURL(type, JPEG_QUALITY)
        resolve({ dataUrl, width, height })
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
