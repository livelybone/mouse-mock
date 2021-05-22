import { getScrollParent } from '@livelybone/scroll-get'
import { getWindow } from './Window'

export function getPoint(el: DOMRect | HTMLElement) {
  const win = 'nodeType' in el ? getWindow(el) : window
  const iframePosition = (() => {
    const pos = { x: 0, y: 0, topWindow: win }
    while (pos.topWindow.frameElement) {
      const rect = pos.topWindow.frameElement.getBoundingClientRect()
      pos.x += rect.x
      pos.y += rect.y
      pos.topWindow = getWindow(pos.topWindow.frameElement as HTMLElement)
    }
    return pos
  })()

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
    width: win.innerWidth,
    height: win.innerHeight,
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
    const minRadius = Math.min(minRect.width / 2, minRect.height / 2)
    const center = {
      x: minRect.x + minRect.width / 2,
      y: minRect.y + minRect.height / 2,
    }
    const isInCircle = () => {
      const a = clientPos.clientX - center.x
      const b = clientPos.clientY - center.y
      return a * a + b * b <= minRadius * minRadius
    }
    do {
      clientPos.clientX =
        center.x + minRadius * Math.random() * (Math.random() > 0.5 ? 1 : -1)
      clientPos.clientY =
        center.y + minRadius * Math.random() * (Math.random() > 0.5 ? 1 : -1)
    } while (!isInCircle())
  }
  const { innerWidth, innerHeight } = iframePosition.topWindow
  clientPos.clientX += iframePosition.x
  clientPos.clientY += iframePosition.y
  screenPos.screenX = clientPos.clientX - innerWidth
  screenPos.screenY = clientPos.clientY - innerHeight
  return {
    ...clientPos,
    ...screenPos,
    window: win,
  }
}
