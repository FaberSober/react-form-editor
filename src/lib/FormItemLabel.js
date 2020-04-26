import React, { PureComponent } from 'react'

import styles from '../styles.module.css'

/** 表单拖动组件Label */
const FormItemLabelList = [
  {
    key: 'basic_item',
    name: '基础字段',
    components: [
      { icon: '', type: 'single_input', label: '单行文本' },
      { icon: '', type: 'multipe_input', label: '多行文本' }
    ]
  }
]

export default class FormItemLabel extends PureComponent {
  static defaultProps = {
    onItemDragStart: () => {}
  }

  /** 工具栏Item拖动开始 */
  handleItemDragStart = (e, item) => {
    const { onItemDragStart } = this.props
    e.dataTransfer.setData('item', JSON.stringify(item))
    if (onItemDragStart) {
      onItemDragStart(item)
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
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
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
