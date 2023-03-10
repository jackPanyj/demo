import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './index.module.less'
import { history } from 'umi';


const Login: React.FC = () => {
  const onFinish = async (values: any) => {
    const params = new URLSearchParams(values)
    const res = await fetch('/api/login?' + params).then(res => res.json())
    if (res.code === 200) {
      localStorage.setItem('hasLogin', JSON.stringify(true))
      history.push('/admin/dashboard')
    }
  }
  return (
    <div className={styles.login}>
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
