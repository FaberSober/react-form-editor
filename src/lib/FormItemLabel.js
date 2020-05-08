import React, { PureComponent } from 'react'

import styles from '../styles.module.css'

const formItemFullLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
/** 表单拖动组件Label */
const FormItemLabelList = [
  {
    key: 'basic_item',
    name: '基础字段',
    components: [
      {
        icon: '',
        type: 'Input',
        layout: { w: 12, h: 1 },
        formPropertyCompnent: 'InputProperty',
        formProperties: { label: '单行文本', name: '单行文本', ...formItemFullLayout },
        properties: { },
      },
      {
        icon: '',
        type: 'TextArea',
        layout: { w: 12, h: 2 },
        formProperties: { label: '多行文本', name: '多行文本', ...formItemFullLayout },
        properties: { },
      },
      {
        icon: '',
        type: 'InputNumber',
        layout: { w: 12, h: 1 },
        formProperties: { label: '数字输入', name: '数字输入', ...formItemFullLayout },
        properties: { },
      },
      {
        icon: '',
        type: 'DatePicker',
        layout: { w: 12, h: 1 },
        formProperties: { label: '日期选择', name: '日期选择', ...formItemFullLayout },
        properties: { },
      },
      {
        icon: '',
        type: 'Checkbox',
        layout: { w: 12, h: 1 },
        formProperties: { label: '多选框', name: '多选框', ...formItemFullLayout },
        properties: {
          options: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }]
        },
      },
      {
        icon: '',
        type: 'Rate',
        layout: { w: 12, h: 1 },
        formProperties: { label: '评分', name: '评分', ...formItemFullLayout },
        properties: { },
      },
      {
        icon: '',
        type: 'Radio',
        layout: { w: 12, h: 1 },
        formProperties: { label: '单选框', name: '单选框', ...formItemFullLayout },
        properties: {
          options: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }]
        },
      },
      {
        icon: '',
        type: 'Switch',
        layout: { w: 12, h: 1 },
        formProperties: { label: '开关', name: '开关', ...formItemFullLayout },
        properties: { },
      },
      {
        icon: '',
        type: 'Slider',
        layout: { w: 12, h: 1 },
        formProperties: { label: '滑动输入', name: '滑动输入', ...formItemFullLayout },
        properties: { },
      },
    ],
  }
]

export default class FormItemLabel extends PureComponent {
  static defaultProps = {
    onItemDragStart: () => {},
    onItemDragEnd: () => {},
  }

  /** 工具栏Item拖动开始 */
  handleItemDragStart = (e, item) => {
    const { onItemDragStart } = this.props
    e.dataTransfer.setData('item', JSON.stringify(item))
    if (onItemDragStart) {
      onItemDragStart(item)
    }
  }

  handleItemDragEnd = (e, item) => {
    const { onItemDragEnd } = this.props
    if (onItemDragEnd) {
      onItemDragEnd(item)
    }
  }

  render() {
    return (
      <div>
        {FormItemLabelList.map((modal) => {
          return (
            <div key={modal.key}>
              <div className={styles.rfeToolItemModalLabel}>{modal.name}</div>
              {modal.components.map((item) => {
                return (
                  <div key={item.type} className={styles.rfeToolItemDiv}>
                    <div
                      className={styles.rfeToolItem}
                      draggable
                      unselectable='on'
                      // this is a hack for firefox
                      // Firefox requires some kind of initialization
                      // which we can do by adding this attribute
                      // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                      onDragStart={(e) => this.handleItemDragStart(e, item)}
                      onDragEnd={(e) => this.handleItemDragEnd(e, item)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.formProperties.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
