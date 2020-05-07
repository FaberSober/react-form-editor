import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'

const defaultValues = {
  // 表单属性
  label: undefined,
  key: undefined,
  // 组件属性
  addonBefore: undefined,
  addonAfter: undefined,
}

/**
 * antd#Input组件配置项
 */
export default class InputProperty extends PureComponent {
  formRef = React.createRef();

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
      const { label, name, ...restValues } = allValues
      onFormConfigChange({ formProperties: { label, name }, properties: restValues })
    }
  }

  transFormValue = props => {
    const { formItemConfig } = props
    return {
      ...formItemConfig.formProperties,
      ...formItemConfig.properties,
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
          <Form.Item name="label" label="标题">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="字段name">
            <Input />
          </Form.Item>
          <Form.Item name="addonBefore" label="前置标签">
            <Input />
          </Form.Item>
          <Form.Item name="addonAfter" label="后置标签">
            <Input />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
