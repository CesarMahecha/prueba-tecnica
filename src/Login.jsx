import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const onFinish = (values, setLoggedIn, captchaRef) => {
  const captchaValue = captchaRef.current.getValue();
  if (!captchaValue) {
    message.error('Please complete the reCAPTCHA!');
    return;
  }

  if (values.username === "admin@admin.com" && values.password === "Admin") {
    message.success('Logged in successfully!');
    setLoggedIn(true); // Establecer el estado de loggedIn a true
  } else {
    message.error('Incorrect username or password!');
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  console.log(import.meta.env.VITE_APP_GOOGLE_CAPTCHA_KEY)
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario está conectado
  const captchaRef = React.createRef();

  // Redirigir a la página deseada si el usuario está conectado
  if (loggedIn) {
    navigate('/characters')
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Parte izquierda con la imagen */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src="https://source.unsplash.com/random?wallpapers" alt="Imagen" style={{ maxWidth: '100%', height: '100%', width: '100%', height: '100%' }} />
      </div>

      {/* Parte derecha con el formulario */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 400,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => onFinish(values, setLoggedIn, captchaRef)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h1>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={import.meta.env.VITE_APP_GOOGLE_CAPTCHA_KEY}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;