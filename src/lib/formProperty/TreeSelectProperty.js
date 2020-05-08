import React from 'react'
import { Form, Input } from 'antd'
import BasePropertyComponent from './BasePropertyComponent'

const defaultValues = {
  // 表单属性
  label: undefined,
  key: undefined,
  // 组件属性
  addonBefore: undefined,
  addonAfter: undefined,
}

/**
 * antd#TreeSelect 组件配置项
 */
export default class TreeSelectProperty extends BasePropertyComponent {
  static defaultProps = {
    formItemId: undefined,
    formItemConfig: {},
    onFormConfigChange: () => {}, // 表单配置变更
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formItemId !== this.props.formItemId) {
      if (this.formRef && this.formRef.setFieldsValue) {
        this.formRef.setFieldsValue({ ...defaultValues, ...this.transFormValue(nextProps) });
      }
    }
  }

  onFormValuesChange = (changedValues, allValues) => {
    const { onFormConfigChange } = this.props;
    if (onFormConfigChange) {
      const { label, name, labelCol, wrapperCol, ...restValues } = allValues
      const formProperties = {
        label,
        name,
        labelCol,
        wrapperCol,
      }
      onFormConfigChange({ formProperties, properties: { ...restValues, treeData: JSON.parse(restValues.treeData) } })
    }
  }

  transFormValue = props => {
    const { formItemConfig: { formProperties, properties } } = props
    return {
      ...formProperties,
      ...properties,
      treeData: JSON.stringify(properties.treeData)
    }
  }

  render() {
    const initialValues = this.transFormValue(this.props)
    return (
      <div style={{ padding: 8 }}>
        <Form
          ref={ref => (this.formRef = ref)}
          layout="vertical"
          initialValues={initialValues}
          onValuesChange={this.onFormValuesChange}
        >
          {this.renderBaseFormProperties()}
          <Form.Item name="treeData" label="treeData">
            <Input.TextArea autoSize />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
