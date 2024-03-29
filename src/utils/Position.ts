import { getScrollParent } from '@livelybone/scroll-get'
import { getOwnerWindow } from '@livelybone/owner-window'

export function getPoint(el: DOMRect | HTMLElement) {
  const win = 'nodeType' in el ? getOwnerWindow(el) : window
  const pagesRect: DOMRect[] = [
    {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    } as any,
  ]

  const rect =
    'style' in el ? (el as Element).getBoundingClientRect() : (el as DOMRect)
  const scrollParentsRect = (() => {
    if ('style' in el) {
      const arr: DOMRect[] = []
      let $el = getScrollParent(el as HTMLElement)
      while ($el) {
        arr.push($el.getBoundingClientRect())
        $el = getScrollParent($el)
      }
      return arr.filter(it => it.width && it.height)
    }
    return []
  })()

  const minRect = (() => {
    let left = -Infinity
    let top = -Infinity
    let right = Infinity
    let bottom = Infinity
    ;[rect, ...scrollParentsRect, ...pagesRect].forEach(it => {
      left = Math.max(left, it.x)
      top = Math.max(top, it.y)
      right = Math.min(right, it.x + it.width)
      bottom = Math.min(bottom, it.y + it.height)
    })

    return { x: left, y: top, width: right - left, height: bottom - top }
  })()

  if (minRect.width <= 0 || minRect.height <= 0) {
    return { clientX: -1, clientY: -1, screenY: -1, screenX: -1 }
  }

  const clientPos = { clientX: 0, clientY: 0 }
  const screenPos = { screenX: 0, screenY: 0 }
  if (rect) {
    const minRadius = Math.min(minRect.width / 2, minRect.height / 2)
    const center = {
      x: minRect.x + minRect.width / 2,
      y: minRect.y + minRect.height / 2,
    }
    if (minRadius >= 1) {
      const isInCircle = () => {
        const a = clientPos.clientX - center.x
        const b = clientPos.clientY - center.y
        return a * a + b * b <= minRadius * minRadius
      }
      do {
        clientPos.clientX = Math.floor(
          center.x + minRadius * Math.random() * (Math.random() > 0.5 ? 1 : -1),
        )
        clientPos.clientY = Math.floor(
          center.y + minRadius * Math.random() * (Math.random() > 0.5 ? 1 : -1),
        )
      } while (!isInCircle())
    } else {
      clientPos.clientX = Math.floor(center.x)
      clientPos.clientY = Math.floor(center.y)
    }
  }
  const { innerWidth, innerHeight } = win
  screenPos.screenX = clientPos.clientX - innerWidth
  screenPos.screenY = clientPos.clientY - innerHeight
  return {
    ...clientPos,
    ...screenPos,
  }
}
