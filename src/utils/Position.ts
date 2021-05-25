import { getScrollParent } from '@livelybone/scroll-get'
import { getWindow } from './Window'

export function getPoint(el: DOMRect | HTMLElement) {
  const win = 'nodeType' in el ? getWindow(el) : window
  const pagesRect: DOMRect[] = [
    {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    } as any,
  ]
  const iframePosition = (() => {
    const pos = { x: 0, y: 0, topWindow: win }
    while (pos.topWindow.frameElement) {
      const currWin = pos.topWindow
      const iframe = currWin.frameElement
      const rect = iframe.getBoundingClientRect()
      pos.topWindow = getWindow(iframe as HTMLElement)

      const style = pos.topWindow.getComputedStyle(iframe)
      rect.x += parseInt(style.borderLeft, 10)
      rect.y += parseInt(style.borderTop, 10)
      rect.width = currWin.innerWidth
      rect.height = currWin.innerHeight
      pagesRect.push(rect)

      pos.x += rect.x
      pos.y += rect.y
    }
    return pos
  })()
  const iframeElRectCorrect = (rect: DOMRect) => {
    // eslint-disable-next-line no-param-reassign
    rect.x += iframePosition.x
    // eslint-disable-next-line no-param-reassign
    rect.y += iframePosition.y
    return rect
  }

  const rect = iframeElRectCorrect(
    'style' in el ? (el as Element).getBoundingClientRect() : (el as DOMRect),
  )
  const scrollParentsRect = (() => {
    if ('style' in el) {
      const arr: DOMRect[] = []
      let $el = getScrollParent(el as HTMLElement)
      while ($el) {
        arr.push(iframeElRectCorrect($el.getBoundingClientRect()))
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
  const { innerWidth, innerHeight } = iframePosition.topWindow
  screenPos.screenX = clientPos.clientX - innerWidth
  screenPos.screenY = clientPos.clientY - innerHeight
  return {
    ...clientPos,
    ...screenPos,
  }
}
