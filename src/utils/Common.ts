export function injectScript(doc: Document, id: string, script: string) {
  if (!doc.getElementById(id)) {
    const tag = doc.createElement('script')
    tag.type = 'text/javascript'
    tag.id = id
    tag.innerHTML = script
    doc.body.appendChild(tag)
  }
}
