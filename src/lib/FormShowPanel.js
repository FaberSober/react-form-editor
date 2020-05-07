import React from 'react'
import GridLayout from 'react-grid-layout'
import each from 'lodash/each'
import { Form } from 'antd'
import FormItemComponent from './FormItemComponent'
// import styles from '../styles.module.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

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
    let formConfig = {
      width: 800, // form width
      labelAlign: 'right',
    } // antd form config
    const layoutItem = {}
    const layout = []
    if (props.formData !== undefined) {
      formConfig = props.formData.formConfig
      each(props.formData.formItems, v => {
        layoutItem[v.id] = v;
        layout.push(v.layout)
      })
    }
    this.state = {
      mounted: false,
      layoutItem, // Form组件Item Key-Item 对应Object
      layout, // Form组件Item--对应的布局
      formConfig,
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formData !== undefined && nextProps.formData !== this.props.formData) {
      const { formConfig, formItems } = nextProps.formData
      const layoutItem = {}
      const layout = []
      each(formItems, v => {
        layoutItem[v.id] = v;
        layout.push(v.layout)
      })
      this.setState({ layoutItem, layout, formConfig })
    }
  }

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

  render() {
    const { layout, formConfig } = this.state
    const { formData, formRef, ...props } = this.props
    return (
      <Form labelAlign={formConfig.labelAlign} ref={formRef} {...props}>
        <GridLayout
          // className={styles.rfeGridLayout}
          style={{ width: formConfig.width }}
          layout={layout}
          cols={12}
          rowHeight={50}
          width={formConfig.width}
          useCSSTransforms={this.state.mounted}
          compactType="vertical"
          margin={[0, 0]}
          isDraggable={false}
          isResizable={false}
        >
          {this.renderLayouItem()}
        </GridLayout>
      </Form>
    )
  }
}
