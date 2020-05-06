# react-form-editor

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-form-editor.svg)](https://www.npmjs.com/package/react-form-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-form-editor
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-form-editor'
import 'react-form-editor/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## Export Form JSON
```
[
  {
    id: 'abcdefgh', // 8位随机字母ID
    type: 'single_input', // form组件类型
    label: '单行文本', // form组件Label标签
    layout: { w: 12, h: 1 } }, //  组件布局（网格布局，分为12格）：w-宽/h-高
    options: [
      { label: 'A', value: 'A' },
    ], // 多选组件候选项
    properties: {

    }, //  组件补充配置属性
  },
]
```

## License

MIT © [https://github.com/FaberSober](https://github.com/https://github.com/FaberSober)
