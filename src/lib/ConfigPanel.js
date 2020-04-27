import React, { PureComponent } from 'react'

import styles from '../styles.module.css'

/**
 * Form Config Panel
 */
export default class ConfigPanel extends PureComponent {
  static defaultProps = {
    formItemConfig: <span>form item config</span>,
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 1,
    }
  }

  render() {
    const { tab } = this.state
    const { formItemConfig } = this.props;
    return (
      <div>
        <div className={styles.rfeConfigTabDiv}>
          <div className={tab === 1 ? styles.rfeConfigTabCurrent : styles.rfeConfigTab} onClick={() => this.setState({ tab: 1 })}>字段属性</div>
          <div className={tab === 2 ? styles.rfeConfigTabCurrent : styles.rfeConfigTab} onClick={() => this.setState({ tab: 2 })}>表单属性</div>
        </div>
        <div>
          {
            tab === 1 ? (<div>{formItemConfig}</div>) : null
          }
          {
            tab === 2 ? (<div>Form config</div>) : null
          }
        </div>
      </div>
    )
  }
}
