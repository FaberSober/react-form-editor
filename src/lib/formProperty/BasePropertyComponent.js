import React, { PureComponent, Fragment } from 'react'
import { Form, Input, InputNumber, Row, Col } from 'antd'

/**
 * antd#输入组件基本Form配置项
 */
export default class BasePropertyComponent extends PureComponent {
  formRef = React.createRef();

  validateLabelCol = async (rules, value) => {
    const wrapperColSpan = this.formRef.getFieldValue(['wrapperCol', 'span'])
    if (wrapperColSpan + value > 24) {
      this.formRef.setFieldsValue({ wrapperCol: { span: 24 - value } })
    }
  }

  validateWrapperCol = async (rules, value) => {
    const labelColSpan = this.formRef.getFieldValue(['labelCol', 'span'])
    if (labelColSpan + value > 24) {
      this.formRef.setFieldsValue({ labelCol: { span: 24 - value } })
    }
  }

  renderBaseFormProperties = () => {
    return (
      <Fragment>
        <Row gutter={8}>
          <Col md={16}>
            <Form.Item name="label" label="标题">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item name={['labelCol', 'span']} label="长度" rules={[{ validator: this.validateLabelCol }]}>
              <InputNumber step={1} min={0} max={24} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col md={16}>
            <Form.Item name="name" label="字段name">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item name={['wrapperCol', 'span']} label="长度" rules={[{ validator: this.validateWrapperCol }]}>
              <InputNumber step={1} min={0} max={24} />
            </Form.Item>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
