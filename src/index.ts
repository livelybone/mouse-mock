import { rewriteListenerBinder } from './Event'
import { getPoint } from './Position'

rewriteListenerBinder()

function eventTrigger(el: Element, ev: any) {
  if (el.dispatchEvent) {
    el.dispatchEvent(ev)
  } else {
    ;(el as any).fireEvent?.(ev)
  }
}

export function mockClick(el: HTMLElement | DOMRect) {
  const ev = document.createEvent('MouseEvent')
  const point = getPoint(el)
  const $el = document.elementFromPoint(point.clientX, point.clientY)
  if (!$el) {
    console.error(`Cannot find element for clicking`)
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
