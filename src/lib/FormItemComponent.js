import React, { PureComponent } from 'react'
import { DatePicker, Input, Form, Checkbox, InputNumber } from 'antd'

/**
 * 组件Item拖动的渲染
 */
export default class FormItemComponent extends PureComponent {
  static defaultProps = {
    formItem: undefined,
  }

  render() {
    const { formItem } = this.props;
    if (typeof formItem === 'undefined') {
      return <div>组件未定义</div>
    }
    let comp = <div>组件未定义</div>
    // const formItemFullLayout = { labelCol: { span: 3 }, wrapperCol: { span: 20 } };
    switch (formItem.type) {
      case 'single_input':
        comp = <Form.Item {...formItem.formProperties}><Input {...formItem.properties} /></Form.Item>
        break
      case 'text_area':
        comp = <Form.Item {...formItem.formProperties}><Input.TextArea autoSize={{ minRows: 3 }} {...formItem.properties} /></Form.Item>
        break
      case 'input_number':
        comp = <Form.Item {...formItem.formProperties}><InputNumber {...formItem.properties} /></Form.Item>
        break
      case 'date_picker':
        comp = <Form.Item {...formItem.formProperties}><DatePicker {...formItem.properties} /></Form.Item>
        break
      case 'checkbox':
        comp = (
          <Form.Item {...formItem.formProperties}>
            <Checkbox.Group {...formItem.properties} />
          </Form.Item>
        )
        break
    }
    return (
      <div>{comp}</div>
    )
  }
}
