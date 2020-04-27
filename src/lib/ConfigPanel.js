import React, { PureComponent, Fragment } from 'react'
import { Form, Radio, InputNumber } from 'antd'

import styles from '../styles.module.css'

/**
 * Form Config Panel
 */
export default class ConfigPanel extends PureComponent {
  static defaultProps = {
    formItemConfig: <span>form item config</span>,
    initialFormConfig: {
      labelAlign: 'right', // 表单布局：left-左对齐/right-右对齐
    },
    onFormConfigChange: () => {}, // 表单配置变更
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 2,
    }
  }

  onFormValuesChange = (values) => {
    const { onFormConfigChange } = this.props;
    if (onFormConfigChange) {
      onFormConfigChange(values)
    }
  }

  renderFormConfig = () => {
    const { initialFormConfig } = this.props;
    return (
      <div style={{ padding: 8 }}>
        <Form
          layout="vertical"
          initialValues={initialFormConfig}
          onValuesChange={this.onFormValuesChange}
        >
          <Form.Item name="labelAlign" label="表单布局">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="left">左对齐</Radio.Button>
              <Radio.Button value="right">右对齐</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="width" label="表单宽度">
            <InputNumber step={1} />
          </Form.Item>
        </Form>
      </div>
    )
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
          {tab === 1 ? (<div>{formItemConfig}</div>) : null}
          {tab === 2 ? (<Fragment>{this.renderFormConfig()}</Fragment>) : null}
        </div>
      </div>
    )
  }
}
