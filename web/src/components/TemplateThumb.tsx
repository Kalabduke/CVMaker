import { useLayoutEffect, useRef, useState } from 'react'
import type { ResumeSchema } from '../types/resume'
import type { TemplateDefinition } from '../templates'

/**
 * Live-rendered thumbnail of a template. Renders the real component at full
 * page width (820px) and scales it down to fit the card, so the preview shows
 * the true design including its accent colors.
 */
export function TemplateThumb({ def, resume }: { def: TemplateDefinition; resume: ResumeSchema }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.22)
  const [height, setHeight] = useState(980)
  const Comp = def.Component

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return
    const measure = () => {
      const w = card.clientWidth - 10
      if (w > 0) setScale(Math.min(w / 820, 0.35))
      if (innerRef.current) setHeight(innerRef.current.offsetHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(card)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={cardRef} className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-md bg-white ring-1 ring-neutral-800"
        style={{ height: Math.round(height * scale) + 6 }}
      >
        <div
          ref={innerRef}
          aria-hidden="true"
          className="pointer-events-none select-none"
          style={{ width: 820, transform: `scale(${scale})`, transformOrigin: 'top left' }}
        >
          <Comp resume={resume} accent={def.meta.defaultAccent} />
        </div>
      </div>
    </div>
  )
}
