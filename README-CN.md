# @livelybone/mouse-mock
[![NPM Version](http://img.shields.io/npm/v/@livelybone/mouse-mock.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/mouse-mock)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/mouse-mock.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/mouse-mock)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A lib for mock mouse events like click, move

## repository
git@github.com:livelybone/mouse-mock.git

## Demo
https://github.com/livelybone/mouse-mock#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone git@github.com:livelybone/mouse-mock.git`
2. 进入本地克隆目录 `cd [the-module-directory]`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/mouse-mock
```

## Global name - The variable the module exported in `umd` bundle
`MouseMock`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

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
在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/mouse-mock/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/mouse-mock/lib/umd/<--module-->.js"></script>
```

或者，你也可以使用 [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/@livelybone/mouse-mock/lib/umd/) 看到你能用到的所有 js 脚本
```html
<script src="https://cdn.jsdelivr.net/npm/@livelybone/mouse-mock/lib/umd/<--module-->.js"></script>
```
