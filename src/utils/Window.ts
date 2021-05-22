import { injectScript } from './Common'

declare global {
  interface HTMLElement {
    getWindow(): Window
  }
}

export function getWindow(el: HTMLElement) {
  injectScript(
    el.ownerDocument,
    'get-window',
    'HTMLElement.prototype.getWindow = () => { return window }',
  )
  return el.getWindow()
}
