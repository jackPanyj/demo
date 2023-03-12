import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import styles from './index.module.less'
import { history } from 'umi';


const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values: any) => {
    const params = new URLSearchParams(values)
    try {
      const res = await fetch('/api/login?' + params).then(res => res.json())
      if (res.code === 200) {
        localStorage.setItem('hasLogin', JSON.stringify(true))
        history.push('/admin/dashboard')
      } else {
        messageApi.error('invalid name or password')
      }
    } catch (error) {
        messageApi.error('unexpected error, please try again later.')
    }
   
  }
  return (
    <div className={styles.login}>
      {contextHolder}
      <div className={styles.title}>Welcome to the admin page</div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 400 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;
