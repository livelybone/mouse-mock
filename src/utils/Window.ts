import { inject } from '@livelybone/script-injector'

declare global {
  interface HTMLElement {
    ownerWindow: Window
  }
}

export function getWindow(el: HTMLElement) {
  if (!el.ownerWindow) {
    inject('HTMLElement.prototype.ownerWindow = window', {
      document: el.ownerDocument,
    })
  }
  return el.ownerWindow
}
