import { getScrollParent } from '@livelybone/scroll-get'

export function getPoint(el: DOMRect | Element) {
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
  const windowRect = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  }

  const minRect = (() => {
    let left = -Infinity
    let top = -Infinity
    let right = Infinity
    let bottom = Infinity
    ;[rect, ...scrollParentsRect, windowRect].forEach(it => {
      left = Math.max(left, it.x)
      top = Math.max(top, it.y)
      right = Math.min(right, it.x + it.width)
      bottom = Math.min(bottom, it.y + it.height)
    })

    return { x: left, y: top, width: right - left, height: bottom - top }
  })()

  const clientPos = { clientX: 0, clientY: 0 }
  const screenPos = { screenX: 0, screenY: 0 }
  if (rect) {
    const { innerWidth, innerHeight } = window
    clientPos.clientX = minRect.x + minRect.width * Math.random()
    clientPos.clientY = minRect.y + minRect.height * Math.random()
    screenPos.screenX = clientPos.clientX - innerWidth
    screenPos.screenY = clientPos.clientY - innerHeight
  }
  return {
    ...clientPos,
    ...screenPos,
  }
}
