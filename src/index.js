import React from 'react'
import GridLayout from 'react-grid-layout'
import each from 'lodash/each'
import { DatePicker, Input } from 'antd'
import FormItemLabel from './lib/FormItemLabel'
import { generateId } from './utils/utils'
import styles from './styles.module.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import 'antd/dist/antd.css'

export class MyFirstGrid extends React.Component {
  state = {
    mounted: false,
    dragingTool: false,
    layout: [],
    layoutItem: {},
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  onLayoutChange = (layout) => {
    console.log('onLayoutChange', layout)
    if (!this.state.dragingTool) {
      this.setState({ layout })
    }
  }

  onDrop = (elemParams) => {
    // console.log('elemParams', elemParams)
    // console.log(elemParams.e.dataTransfer.getData('item'))
    const { e, ...pos } = elemParams
    const formItem = JSON.parse(e.dataTransfer.getData('item'))
    // alert(`Element parameters:\n${JSON.stringify(elemParams, ['x', 'y', 'w', 'h'], 2)}`);
    const id = generateId()
    this.setState((prevState) => ({
      layout: [...prevState.layout, { i: id, ...pos }],
      layoutItem: { ...prevState.layoutItem, [id]: formItem },
      dragingTool: false,
    }))
  }

  renderItem = (formItem) => {
    console.log('renderItem', formItem)
    if (typeof formItem === 'undefined') {
      return <div>组件未定义</div>
    }
    let comp = <div>组件未定义</div>
    switch (formItem.type) {
      case 'single_input':
        comp = <Input />
        break
      case 'multipe_input':
        comp = <Input.TextArea />
        break
    }
    return comp
  }

  renderLayouItem = () => {
    const { layoutItem } = this.state
    const doms = []
    each(layoutItem, (v, k) => {
      doms.push(
        <div
          key={k}
          style={{ backgroundColor: v.backgroundColor }}
        >
          {this.renderItem(v)}
        </div>
      )
    })
    return doms
  }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    const { layout } = this.state
    return (
      <div className={styles.rfeContaienr}>
        <div className={styles.rfeToolbox}>
          <FormItemLabel onItemDragStart={() => this.setState({ dragingTool: true })} />
        </div>
        <div className={styles.rfePanel}>
          <GridLayout
            className={styles.rfeGridLayout}
            layout={layout}
            onLayoutChange={this.onLayoutChange}
            cols={12}
            rowHeight={30}
            width={840}
            isDroppable
            onDrop={this.onDrop}
            useCSSTransforms={this.state.mounted}
          >
            {this.renderLayouItem()}
          </GridLayout>
        </div>
        <div className={styles.rfePropertiesDiv}>
          <div>组件属性面板</div>
        </div>
      </div>
    )
  }
}
