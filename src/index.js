import React from 'react'
import GridLayout from 'react-grid-layout'
import each from 'lodash/each'
import filter from 'lodash/filter'
import { FaTrashAlt } from 'react-icons/fa'
import { DatePicker, Input, Form, Checkbox } from 'antd'
import FormItemLabel from './lib/FormItemLabel'
import ConfigPanel from './lib/ConfigPanel'
import { generateId } from './utils/utils'
import styles from './styles.module.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import 'antd/dist/antd.css'

export class MyFirstGrid extends React.Component {
  layoutDraging = {}; // 保存拖动中的layout

  state = {
    mounted: false,
    dragingTool: false,
    selectedItemId: undefined, // 选中状态的Item#id
    layoutItem: {}, // Form组件Item Key-Item 对应Object
    layout: [], // Form组件Item--对应的布局
    droppingId: generateId(),
    droppingItemLayout: { w: 6, h: 1 }, // dropping item ghost layout
    formConfig: {
      width: 800, // form width
      labelAlign: 'right',
    }, // antd form config
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  onLayoutChange = (layout) => {
    // console.log('onLayoutChange', layout)
    if (!this.state.dragingTool) {
      this.setState({ layout })
    }
  }

  onDrop = (elemParams) => {
    const { e, ...pos } = elemParams
    // 拖动toolbox中的组件Item
    const formItem = JSON.parse(e.dataTransfer.getData('item'))
    // alert(`Element parameters:\n${JSON.stringify(elemParams, ['x', 'y', 'w', 'h'], 2)}`);
    const id = generateId()
    this.setState((prevState) => ({
      layout: [...this.layoutDraging, { i: id, ...pos, ...formItem.layout }],
      layoutItem: { ...prevState.layoutItem, [id]: formItem },
      dragingTool: false,
      selectedItemId: id,
    }))
  }

  handleToolItemDropStart = (toolItem) => {
    this.setState(prevState => ({
      droppingItemLayout: { ...prevState.droppingItemLayout, ...toolItem.layout },
      dragingTool: true,
    }))
  }

  /**
   * 删除Item
   */
  handleDelItem = (id) => {
    const { layoutItem, layout } = this.state;
    const newLayoutItem = { ...layoutItem };
    delete newLayoutItem[id]
    const newLayout = filter(layout, l => l.i !== id)
    this.setState({ layoutItem: newLayoutItem, layout: newLayout })
  }

  /**
   * 表单配置变更
   */
  handleFormConfigChange = values => {
    const { formConfig } = this.state
    this.setState({
      formConfig: {
        ...formConfig,
        ...values,
      }
    })
  }

  renderItem = (formItem, id) => {
    // console.log('renderItem', formItem)
    if (typeof formItem === 'undefined') {
      return <div>组件未定义</div>
    }
    let comp = <div>组件未定义</div>
    switch (formItem.type) {
      case 'single_input':
        comp = <Form.Item label={formItem.label}><Input /></Form.Item>
        break
      case 'multipe_input':
        comp = <Form.Item label={formItem.label}><Input.TextArea autoSize={{ minRows: 3 }} /></Form.Item>
        break
      case 'date_picker':
        comp = <Form.Item label={formItem.label}><DatePicker /></Form.Item>
        break
      case 'checkbox':
        comp = (
          <Form.Item label={formItem.label}>
            <Checkbox.Group options={formItem.options} />
          </Form.Item>
        )
        break
    }
    return (
      <div>{comp}</div>
    )
  }

  renderLayouItem = () => {
    const { layout, layoutItem, selectedItemId, droppingId } = this.state
    const doms = []
    each(layout, (v, k) => {
      if (v.i !== droppingId) {
        const selected = v.i === selectedItemId;
        const formItem = layoutItem[v.i];
        doms.push(
          <div
            key={v.i}
            className={selected ? styles.rfeFormItemDivSelected : styles.rfeFormItemDiv}
            style={{ backgroundColor: v.backgroundColor }}
            onClick={() => this.setState({ selectedItemId: v.i })}
          >
            {this.renderItem(formItem, v.i)}
            {selected ? <div className={styles.rfeFormItemDelDiv} onClick={() => this.handleDelItem(v.i)}><FaTrashAlt /></div> : null}
          </div>
        )
      }
    })
    return doms
  }

  render() {
    // console.log('MyFirstGrid.render')
    const { layout, droppingId, droppingItemLayout, formConfig } = this.state
    return (
      <div className={styles.rfeContaienr}>
        <div className={styles.rfeToolbox}>
          <FormItemLabel onItemDragStart={this.handleToolItemDropStart} onItemDragEnd={() => this.setState({ dragingTool: false })} />
        </div>
        <div className={styles.rfePanel}>
          <Form labelAlign={formConfig.labelAlign}>
            <GridLayout
              className={styles.rfeGridLayout}
              style={{ width: formConfig.width }}
              layout={layout}
              onLayoutChange={this.onLayoutChange}
              cols={12}
              rowHeight={50}
              width={formConfig.width}
              isDroppable
              onDrop={this.onDrop}
              useCSSTransforms={this.state.mounted}
              compactType="vertical"
              droppingItem={{ i: droppingId, w: 1, h: 1, ...droppingItemLayout }}
              margin={[0, 0]}
              // onDragStart={() => console.log('onDragStart')}
              onDrag={(layout) => { this.layoutDraging = layout }}
              // onDragStop={() => console.log('onDragStop')}
            >
              {this.renderLayouItem()}
            </GridLayout>
          </Form>
        </div>
        <div className={styles.rfePropertiesDiv}>
          <ConfigPanel initialFormConfig={formConfig} onFormConfigChange={this.handleFormConfigChange} />
        </div>
      </div>
    )
  }
}
