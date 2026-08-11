import { useRef, useState } from 'react'
import { compressImageFile } from '../lib/image'

/** Photo picker: upload (client-compressed), paste URL, or remove. */
export function PhotoUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [showUrl, setShowUrl] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const { dataUrl } = await compressImageFile(file)
      onChange(dataUrl)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <label className="block">
      <span className="mb-1 block text-[11px] text-neutral-500">Photo</span>
      {value ? (
        <div className="flex items-center gap-3">
          <img
            src={value}
            alt="Profile preview"
            className="h-16 w-16 rounded-full border border-neutral-700 object-cover"
          />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="rounded-lg border border-neutral-600 px-3 py-1.5 text-[12px] text-neutral-300 hover:border-neutral-400"
              onClick={() => inputRef.current?.click()}
            >
              Change photo
            </button>
            <button
              type="button"
              className="rounded-lg border border-neutral-700 px-3 py-1.5 text-[12px] text-neutral-400 hover:border-red-400 hover:text-red-300"
              onClick={() => onChange('')}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="rounded-lg border border-dashed border-neutral-600 px-3 py-2 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
            onClick={() => inputRef.current?.click()}
          >
            {busy ? 'Processing…' : 'Upload photo'}
          </button>
          <button
            type="button"
            className="ml-2 text-[11px] text-neutral-500 underline-offset-2 hover:text-neutral-300 hover:underline"
            onClick={() => setShowUrl((s) => !s)}
          >
            {showUrl ? 'Hide URL' : 'or paste a URL'}
          </button>
          {showUrl && (
            <input
              className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-[13px] text-neutral-100 placeholder-neutral-500 outline-none focus:border-neutral-500"
              placeholder="https://.../photo.jpg"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        </div>
      )}
      {error && <span className="mt-1 block text-[11px] text-red-400">{error}</span>}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </label>
  )
}
