import { getPoint } from './utils/Position'

export { rewriteListenerBinder } from './RewriteListenerBinder'

function eventTrigger(el: Element, ev: any) {
  if (el.dispatchEvent) {
    el.dispatchEvent(ev)
  } else {
    ;(el as any).fireEvent?.(ev)
  }
}

export function mockMouseEvent(
  eventType: string,
  el?: HTMLElement | DOMRect | null,
) {
  if (el) {
    const originPoint = getPoint(el)
    const point = { ...originPoint }
    let $el = document.elementFromPoint(point.clientX, point.clientY)
    let ev = document.createEvent('MouseEvent')
    while ($el?.nodeName === 'IFRAME' && $el !== el) {
      const win = ($el as HTMLIFrameElement).contentWindow
      const doc = win?.document
      if (doc) {
        const rect = $el.getBoundingClientRect()
        const style = window.getComputedStyle($el)
        $el = doc.elementFromPoint(
          (point.clientX -= rect.x + parseInt(style.borderLeft, 10)),
          (point.clientY -= rect.y + parseInt(style.borderTop, 10)),
        )
        ev = doc.createEvent('MouseEvent')
      } else {
        break
      }
    }
    if (!$el) {
      console.error(
        `Cannot find element for ${eventType}, it seems that the element or the rect you provide is out of the viewport.\n`,
        {
          el,
          point,
          originPoint,
        },
      )
    } else {
      ev.initMouseEvent(
        eventType,
        true,
        true,
        window,
        0,
        point.screenX,
        point.screenY,
        point.clientX,
        point.clientY,
        false,
        false,
        false,
        false,
        0,
        $el,
      )
      eventTrigger($el, ev)
    }
    return { originPoint, point }
  }
}

export function mockClick(el?: HTMLElement | DOMRect | null) {
  mockMouseEvent('mouseenter', el)
  mockMouseEvent('mouseover', el)
  mockMouseEvent('mousemove', el)
  return mockMouseEvent('click', el)
}
