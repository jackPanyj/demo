import React, { useState } from 'react'
import { Button, Form, Input, Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { RcFile } from 'antd/es/upload/interface'

import styles from './index.module.less'
import { uploadFile } from '@/tool'
import { history } from 'umi'


const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fetching, setFetching] = useState(false)

  const [form] = Form.useForm()

  const [file, setFile] = useState<RcFile>()

  const beforeUpload = (file: RcFile) => {
    setFile(file)
    return false
  }

  const goToNext = () => {
    const hasLogin = localStorage.getItem('hasLogin')
    if (hasLogin) {
      history.push('/admin/dashboard')
    } else {
      history.push('/admin')
    }
  }

  const handleOk = async () => {
    if (fetching) {
      return
    }
    setFetching(true)
    try {
      const { name, govIDNumber } = form.getFieldsValue()
      const fileRes = await uploadFile(file as RcFile)
      const data = { name, id: govIDNumber, picUrl: fileRes.data.kraked_url }

      const res = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => res.json())
      if (res.code === 200) {
        message.success('submit successfully')
      }
      form.resetFields()
    } catch (error) {
    } finally {
      setFetching(false)
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setFetching(false)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.app}>
      <div className={styles.title}>Welcome to the Demo</div>
      <div className={styles.adminBtn}>
        <Button type='link' onClick={goToNext}>Go to Admin</Button>
      </div>
      <Form
        className={styles.form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={() => setIsModalOpen(true)}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'name can not be empty!' }]}
        >
          <Input placeholder='Please input your name!' />
        </Form.Item>

        <Form.Item
          label="Gov ID Number"
          name="govIDNumber"
          rules={[
            { required: true, message: 'Gov ID Number can not be empty!' },
          ]}
        >
          <Input placeholder='Please input your Gov ID Number!' />
        </Form.Item>

        <Form.Item
          label="Gov ID Picture"
          valuePropName="fileList"
          name='file'
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Gov ID Picture can not be empty!' }]}
        >
          <Upload maxCount={1} beforeUpload={beforeUpload} listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Confirmation"
        open={isModalOpen}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you canfirm to submit?</p>
      </Modal>
    </div>
  )
}

export default App