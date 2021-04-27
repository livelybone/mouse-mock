export function getPoint(el: DOMRect | Element) {
  const rect =
    'style' in el ? (el as Element).getBoundingClientRect() : (el as DOMRect)
  const clientPos = { clientX: 0, clientY: 0 }
  const screenPos = { screenX: 0, screenY: 0 }
  if (rect) {
    const { innerWidth, innerHeight } = window
    clientPos.clientX = rect.x + rect.width * Math.random()
    clientPos.clientY = rect.y + rect.height * Math.random()
    screenPos.screenX = clientPos.clientX - innerWidth
    screenPos.screenY = clientPos.clientY - innerHeight
  }
  return {
    ...clientPos,
    ...screenPos,
  }
}
