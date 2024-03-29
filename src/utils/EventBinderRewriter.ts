/* eslint-disable no-underscore-dangle,no-proto */
declare global {
  interface Element {
    _addEventListener: Element['addEventListener']
    _removeEventListener: Element['removeEventListener']
  }

  interface Window {
    $$RewriteListenerBinderSuccess$$?: boolean
  }
}

function eventDeal(ev: any) {
  if (ev.isTrusted) return ev
  const $ev: any = {}
  let proto = ev
  while (proto.__proto__) {
    Object.keys(proto.__proto__).forEach(k => {
      Object.defineProperty($ev, k, {
        get: () => {
          const val = ev[k]
          if (typeof val === 'function') return val.bind(ev)
          return val
        },
        configurable: true,
      })
    })
    proto = proto.__proto__
  }
  $ev.isTrusted = true
  $ev.__proto__ = ev.__proto__?.constructor?.prototype || ev.__proto__
  return $ev
}

const cache = new Map()

export function rewriteListenerBinder() {
  if (!window.$$RewriteListenerBinderSuccess$$) {
    Element.prototype._addEventListener = Element.prototype.addEventListener
    Element.prototype._removeEventListener =
      Element.prototype.removeEventListener

    Element.prototype.addEventListener = function addEventListener(
      type: string,
      cb: (ev: any) => void,
    ) {
      const listener = cache.get(cb) || ((ev: any) => cb(eventDeal(ev)))
      this._addEventListener(type, listener)
    }

    Element.prototype.removeEventListener = function removeEventListener(
      type: string,
      cb: (ev: any) => void,
    ) {
      const listener = cache.get(cb)
      if (listener) {
        this._removeEventListener(type, listener)
        cache.delete(cb)
      }
    }

    Object.getOwnPropertyNames(HTMLElement.prototype).forEach(k => {
      if (k.startsWith('on')) {
        const descriptor = Object.getOwnPropertyDescriptor(
          HTMLElement.prototype,
          k,
        )!
        Object.defineProperty(HTMLElement.prototype, `_${k}`, descriptor)
        Object.defineProperty(HTMLElement.prototype, k, {
          ...descriptor,
          set: function set(cb) {
            this[`_${k}`] =
              typeof cb === 'function'
                ? function _(ev: any) {
                    // @ts-ignore
                    return cb.call(this, eventDeal(ev))
                  }
                : cb
          },
        })
      }
    })

    Object.defineProperty(window, '$$RewriteListenerBinderSuccess$$', {
      value: true,
      writable: false,
      configurable: true,
    })
  }
}
