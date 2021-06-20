import { getOwnerWindow } from '@livelybone/owner-window'
import { getPoint } from './utils/Position'

export { rewriteListenerBinder } from './utils/EventBinderRewriter'

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
    const point = getPoint(el)
    const $el =
      el && 'nodeName' in el
        ? el
        : document.elementFromPoint(point.clientX, point.clientY)
    const ev = $el?.ownerDocument.createEvent('MouseEvent')
    if (!$el) {
      console.error(
        `Cannot find element for ${eventType}, it seems that the element or the rect you provide is out of the viewport.\n`,
        {
          el,
          point,
        },
      )
    } else {
      ev!.initMouseEvent(
        eventType,
        true,
        true,
        getOwnerWindow($el as HTMLElement),
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
    return { point }
  }
}

export function mockClick(el?: HTMLElement | DOMRect | null) {
  mockMouseEvent('mouseenter', el)
  mockMouseEvent('mouseover', el)
  mockMouseEvent('mousemove', el)
  mockMouseEvent('mousedown', el)
  mockMouseEvent('mouseup', el)
  const res = mockMouseEvent('click', el)
  mockMouseEvent('mousemove', el)
  mockMouseEvent('mouseout', el)
  mockMouseEvent('mouseleave', el)
  return res
}
