import React from 'react'
import GridLayout from 'react-grid-layout'
import each from 'lodash/each'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import { FaTrashAlt } from 'react-icons/fa'
import { Form, Button, Modal } from 'antd'
import FormItemLabel from './FormItemLabel'
import ConfigPanel from './ConfigPanel'
import FormItemComponent from './FormItemComponent'
import FormShowPanel from './FormShowPanel'
import { generateId } from '../utils/utils'
import styles from '../styles.module.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import 'antd/dist/antd.css'

/**
 * 表单编辑组件
 */
export default class FormEditPanel extends React.Component {
  previewFormRef = React.createRef();

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
      size: 'middle', // form size
    }, // antd form config
    previewModalVisible: false,
    previewFormData: undefined,
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

  /**
   * 选中 字段属性 变更
   */
  handleFormItemConfigChange = values => {
    const { selectedItemId, layoutItem } = this.state
    const { formProperties, properties } = values
    layoutItem[selectedItemId] = {
      ...layoutItem[selectedItemId],
      formProperties: { ...layoutItem[selectedItemId].formProperties, ...formProperties },
      properties: { ...layoutItem[selectedItemId].properties, ...properties },
    }
    this.setState({ layoutItem: { ...layoutItem } })
  }

  handleSave = () => {
    const data = this.getFormDataJson()
    console.log(data)
  }

  handlePreview = () => {
    const data = this.getFormDataJson()
    this.setState({ previewModalVisible: true, previewFormData: data })
  }

  getFormDataJson = () => {
    const { layout, layoutItem, formConfig } = this.state
    const formItems = []
    // layout排序：y、x
    const layoutSorted = sortBy(layout, l => l.y * 100 + l.x)
    each(layoutSorted, l => {
      const item = layoutItem[l.i]
      if (item !== undefined) {
        formItems.push({ id: l.i, ...item, layout: l })
      }
    })
    const data = { formConfig, formItems }
    return data;
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
            <FormItemComponent formItem={formItem} />
            {selected ? <div className={styles.rfeFormItemDelDiv} onClick={() => this.handleDelItem(v.i)}><FaTrashAlt /></div> : null}
          </div>
        )
      }
    })
    return doms
  }

  render() {
    // console.log('MyFirstGrid.render')
    const { layout, layoutItem, droppingId, droppingItemLayout, formConfig, selectedItemId } = this.state

    return (
      <div className={styles.rfeContaienr}>
        <div className={styles.rfeToolbox}>
          <FormItemLabel onItemDragStart={this.handleToolItemDropStart} onItemDragEnd={() => this.setState({ dragingTool: false })} />
        </div>
        <div className={styles.rfePanel}>
          <div>
            <Button type="link" onClick={this.handlePreview}>预览</Button>
            <Button type="link" onClick={this.handleSave}>保存</Button>
          </div>
          <Form {...formConfig}>
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
          <ConfigPanel
            initialFormConfig={formConfig}
            onFormConfigChange={this.handleFormConfigChange}
            formItemId={selectedItemId}
            formItemConfig={layoutItem[selectedItemId]}
            onFormItemConfigChange={this.handleFormItemConfigChange}
          />
        </div>
        <Modal
          visible={this.state.previewModalVisible}
          title="表单预览"
          onOk={() => this.previewFormRef.submit()}
          onCancel={() => this.setState({ previewModalVisible: false })}
          width={formConfig.width + 48}
        >
          <FormShowPanel
            formRef={ref => (this.previewFormRef = ref)}
            onFinish={values => console.log('onFinish', values)}
            formData={this.state.previewFormData}
          />
        </Modal>
      </div>
    )
  }
}
