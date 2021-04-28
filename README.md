# @livelybone/mouse-mock
[![NPM Version](http://img.shields.io/npm/v/@livelybone/mouse-mock.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/mouse-mock)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/mouse-mock.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/mouse-mock)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A lib for mock mouse events like click, move

## repository
git@github.com:livelybone/mouse-mock.git

## Demo
https://github.com/livelybone/mouse-mock#readme

## Run Example
you can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone git@github.com:livelybone/mouse-mock.git`
2. Go to the directory `cd [the-module-directory]`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/mouse-mock
```

## Global name - The variable the module exported in `umd` bundle
`MouseMock`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import * as MouseMock from '@livelybone/mouse-mock'

const el = document.getElementById('id')
MouseMock.mockClick(el)

// or
const pos = { x: 100, y: 100 }
MouseMock.mockClick(pos)
```

## CDN
Use in html, see what you can use in [CDN: unpkg](https://unpkg.com/@livelybone/mouse-mock/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/mouse-mock/lib/umd/<--module-->.js"></script>
```

Or，see what you can use in [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/@livelybone/mouse-mock/lib/umd/)
```html
<script src="https://cdn.jsdelivr.net/npm/@livelybone/mouse-mock/lib/umd/<--module-->.js"></script>
```
