import { rewriteListenerBinder } from './utils/EventBinderRewriter'

rewriteListenerBinder()

if (typeof document !== 'undefined') {
  Object.defineProperty(document, 'hidden', {
    get: () => false,
    configurable: true,
  })
  Object.defineProperty(document, 'visibilityState', {
    get: () => 'visible',
    configurable: true,
  })

  Object.defineProperty(navigator, 'userAgent', {
    get: () =>
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363',
    configurable: true,
  })
  Object.defineProperty(window, 'UA', {
    get: () =>
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363',
    configurable: true,
  })
  window.requestAnimationFrame = callback => setTimeout(callback, 16)
}

export * from './index'
