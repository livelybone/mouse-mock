import { rewriteListenerBinder } from './utils/Event'
import { getPoint } from './utils/Position'

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
    const ev = document.createEvent('MouseEvent')
    const point = getPoint(el)
    const $el = document.elementFromPoint(point.clientX, point.clientY)
    if (!$el) {
      console.error(
        'Cannot find element for clicking, it seems that the element or the rect you provide is out of the viewport.\n',
        el,
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
  }
}
