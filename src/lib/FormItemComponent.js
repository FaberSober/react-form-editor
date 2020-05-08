import React, { PureComponent } from 'react'
import { DatePicker, TimePicker, Input, Form, Checkbox, InputNumber, Rate, Radio, Switch, Slider, Select, TreeSelect, Cascader } from 'antd'

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
      case 'Input':
        comp = <Form.Item {...formItem.formProperties}><Input {...formItem.properties} /></Form.Item>
        break
      case 'TextArea':
        comp = <Form.Item {...formItem.formProperties}><Input.TextArea autoSize={{ minRows: 3 }} {...formItem.properties} /></Form.Item>
        break
      case 'InputNumber':
        comp = <Form.Item {...formItem.formProperties}><InputNumber {...formItem.properties} /></Form.Item>
        break
      case 'DatePicker':
        comp = <Form.Item {...formItem.formProperties}><DatePicker {...formItem.properties} /></Form.Item>
        break
      case 'TimePicker':
        comp = <Form.Item {...formItem.formProperties}><TimePicker {...formItem.properties} /></Form.Item>
        break
      case 'Checkbox':
        comp = (
          <Form.Item {...formItem.formProperties}>
            <Checkbox.Group {...formItem.properties} />
          </Form.Item>
        )
        break
      case 'Rate':
        comp = <Form.Item {...formItem.formProperties}><Rate {...formItem.properties} /></Form.Item>
        break
      case 'Radio':
        comp = <Form.Item {...formItem.formProperties}><Radio.Group {...formItem.properties} /></Form.Item>
        break
      case 'Switch':
        comp = <Form.Item {...formItem.formProperties}><Switch {...formItem.properties} /></Form.Item>
        break
      case 'Slider':
        comp = <Form.Item {...formItem.formProperties}><Slider {...formItem.properties} /></Form.Item>
        break
      case 'Select':
        comp = <Form.Item {...formItem.formProperties}><Select {...formItem.properties} /></Form.Item>
        break
      case 'TreeSelect':
        comp = <Form.Item {...formItem.formProperties}><TreeSelect {...formItem.properties} /></Form.Item>
        break
      case 'Cascader':
        comp = <Form.Item {...formItem.formProperties}><Cascader {...formItem.properties} /></Form.Item>
        break
    }
    return (
      <div>{comp}</div>
    )
  }
}
