import { rewriteListenerBinder } from './utils/Event'
import { getPoint } from './utils/Position'

export { getWindow } from './utils/Window'

rewriteListenerBinder()

function eventTrigger(el: Element, ev: any) {
  if (el.dispatchEvent) {
    el.dispatchEvent(ev)
  } else {
    ;(el as any).fireEvent?.(ev)
  }
}

export function mockClick(el?: HTMLElement | DOMRect | null) {
  if (el) {
    const originPoint = getPoint(el)
    const point = { ...originPoint }
    let $el = document.elementFromPoint(point.clientX, point.clientY)
    let ev = document.createEvent('MouseEvent')
    while ($el?.nodeName === 'IFRAME' && $el !== el) {
      const doc = ($el as HTMLIFrameElement).contentWindow?.document
      if (doc) {
        const rect = $el.getBoundingClientRect()
        $el = doc.elementFromPoint(
          (point.clientX -= rect.x),
          (point.clientY -= rect.y),
        )
        ev = doc.createEvent('MouseEvent')
      } else {
        break
      }
    }
    if (!$el) {
      console.error(
        'Cannot find element for clicking, it seems that the element or the rect you provide is out of the viewport.\n',
        el,
        point,
      )
    } else {
      ev.initMouseEvent(
        'click',
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
