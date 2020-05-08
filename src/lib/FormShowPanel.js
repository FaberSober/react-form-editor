import React from 'react'
import each from 'lodash/each'
import { Form, Row, Col } from 'antd'
import FormItemComponent from './FormItemComponent'

import 'antd/dist/antd.css'

/**
 * 表单呈现组件
 */
export default class FormShowPanel extends React.Component {
  static defaultProps = {
    formData: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      // layoutItem: {}, // Form组件Item Key-Item 对应Object
      // layout: [], // Form组件Item--对应的布局
      // formConfig: {
      //   width: 800, // form width
      //   labelAlign: 'right',
      // }, // antd form config
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
    // this.parseFormData(this.props)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.formData !== undefined && nextProps.formData !== this.props.formData) {
  //     this.parseFormData(nextProps)
  //   }
  // }

  // parseFormData = (props) => {
  //   const { formConfig, formItems } = props.formData
  //   const layoutItem = {}
  //   const layout = []
  //   each(formItems, v => {
  //     layoutItem[v.id] = v;
  //     layout.push(v.layout)
  //   })
  //   const formItemsGrouped = groupBy(formItems, v => v.layout.y)
  //   console.log('formItemsGrouped', formItemsGrouped)
  //   // TODO 将react-grid-layout转化为row、col分组
  //   this.setState({ layoutItem, layout, formConfig })
  // }

  renderLayouItem = () => {
    const { layout, layoutItem } = this.state
    const doms = []
    each(layout, (v, k) => {
      const formItem = layoutItem[v.i];
      doms.push(
        <div
          key={v.i}
          // className={styles.rfeFormItemDiv}
          style={{ backgroundColor: v.backgroundColor }}
          onClick={() => this.setState({ selectedItemId: v.i })}
        >
          <FormItemComponent formItem={formItem} />
        </div>
      )
    })
    return doms
  }

  /**
   * FIXME 目前转化为Row、Col不支持复杂的结构变形
   */
  render() {
    const { formData, formRef, ...props } = this.props
    if (formData === undefined) return null;
    return (
      <Form labelAlign={formData.formConfig.labelAlign} ref={formRef} {...props}>
        <Row>
          {
            formData.formItems.map(item => {
              return (
                <Col key={item.id} md={item.layout.w * 2}>
                  <FormItemComponent formItem={item} />
                </Col>
              )
            })
          }
        </Row>
      </Form>
    )
  }
}
