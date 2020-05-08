import React, { PureComponent } from 'react'

import styles from '../styles.module.css'

/** 表单拖动组件Label */
const FormItemLabelList = [
  {
    key: 'basic_item',
    name: '基础字段',
    components: [
      { icon: '', type: 'single_input', formProperties: { label: '单行文本', name: '单行文本' }, layout: { w: 12, h: 1 } },
      { icon: '', type: 'multipe_input', formProperties: { label: '多行文本', name: '多行文本' }, layout: { w: 12, h: 2 } },
      { icon: '', type: 'date_picker', formProperties: { label: '日期选择', name: '日期选择' }, layout: { w: 12, h: 1 } },
      { icon: '', type: 'checkbox', formProperties: { label: '多选框', name: '多选框' }, layout: { w: 12, h: 1 }, options: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }] },
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
