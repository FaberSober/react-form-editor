import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'

const defaultValues = {
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
    // console.log('InputProperty#componentWillReceiveProps', nextProps, this.props)
    if (nextProps.formItemId !== this.props.formItemId) {
      if (this.formRef && this.formRef.setFieldsValue) {
        this.formRef.setFieldsValue({ ...defaultValues, ...nextProps.formItemConfig.properties });
      }
    }
  }

  onFormValuesChange = (values) => {
    const { onFormConfigChange } = this.props;
    if (onFormConfigChange) {
      onFormConfigChange(values)
    }
  }

  render() {
    const { formItemConfig } = this.props;
    return (
      <div style={{ padding: 8 }}>
        <Form
          ref={ref => (this.formRef = ref)}
          layout="vertical"
          initialValues={formItemConfig.properties}
          onValuesChange={this.onFormValuesChange}
        >
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
