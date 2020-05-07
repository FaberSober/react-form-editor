import React, { PureComponent } from 'react'
import { DatePicker, Input, Form, Checkbox } from 'antd'

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
    const formItemFullLayout = { labelCol: { span: 3 }, wrapperCol: { span: 20 } };
    switch (formItem.type) {
      case 'single_input':
        comp = <Form.Item {...formItemFullLayout} {...formItem.formProperties}><Input {...formItem.properties} /></Form.Item>
        break
      case 'multipe_input':
        comp = <Form.Item {...formItemFullLayout} {...formItem.formProperties}><Input.TextArea autoSize={{ minRows: 3 }} {...formItem.properties} /></Form.Item>
        break
      case 'date_picker':
        comp = <Form.Item {...formItemFullLayout} {...formItem.formProperties}><DatePicker {...formItem.properties} /></Form.Item>
        break
      case 'checkbox':
        comp = (
          <Form.Item {...formItemFullLayout} {...formItem.formProperties}>
            <Checkbox.Group options={formItem.options} />
          </Form.Item>
        )
        break
    }
    return (
      <div>{comp}</div>
    )
  }
}
