import React, { PureComponent, Fragment } from 'react'
import { Form, Radio, InputNumber, Input } from 'antd'

import * as FormProperty from './formProperty'

import styles from '../styles.module.css'

const NulConfig = () => (<div>TODO</div>)

/**
 * Form Config Panel
 */
export default class ConfigPanel extends PureComponent {
  static defaultProps = {
    formItemId: undefined,
    formItemConfig: undefined,
    initialFormConfig: {
      labelAlign: 'right', // 表单布局：left-左对齐/right-右对齐
    },
    onFormConfigChange: () => {}, // 表单配置变更
    onFormItemConfigChange: () => {}, // 字段属性变更
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 1,
    }
  }

  /** 选中 字段属性 变更 */
  handleFormItemConfigChange = values => {
    const { formItemConfig, onFormItemConfigChange } = this.props;
    if (onFormItemConfigChange) {
      onFormItemConfigChange({ ...formItemConfig.properties, ...values })
    }
  }

  /** 表单属性变更 */
  onFormValuesChange = (changedValues, allValues) => {
    const { onFormConfigChange } = this.props;
    if (onFormConfigChange) {
      onFormConfigChange(allValues)
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
          <Form.Item name="name" label="表单名称">
            <Input />
          </Form.Item>
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
    const { formItemId, formItemConfig } = this.props;
    const FormItemConfigComponent = (formItemConfig && FormProperty[formItemConfig.formPropertyCompnent]) || NulConfig
    return (
      <div>
        <div className={styles.rfeConfigTabDiv}>
          <div className={tab === 1 ? styles.rfeConfigTabCurrent : styles.rfeConfigTab} onClick={() => this.setState({ tab: 1 })}>字段属性</div>
          <div className={tab === 2 ? styles.rfeConfigTabCurrent : styles.rfeConfigTab} onClick={() => this.setState({ tab: 2 })}>表单属性</div>
        </div>
        <div>
          {tab === 1 ? (<FormItemConfigComponent formItemId={formItemId} formItemConfig={formItemConfig} onFormConfigChange={this.handleFormItemConfigChange} />) : null}
          {tab === 2 ? (<Fragment>{this.renderFormConfig()}</Fragment>) : null}
        </div>
      </div>
    )
  }
}
