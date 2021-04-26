export interface Position {
  clientX: number
  clientY: number
}

export function mockClick(el: HTMLElement, pos?: Position) {
  console.warn(el, pos)
}

export function mockMove(startPos: Position, endPos: Position) {
  console.warn(startPos, endPos)
}
