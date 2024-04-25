import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const captchaRef = React.createRef();

  const handleResetPassword = () => {
    const captchaValue = captchaRef.current.getValue();
    if (!captchaValue) {
      message.error('Please complete the reCAPTCHA!');
      return;
    }
    // Aquí puedes enviar la solicitud de restablecimiento de contraseña
    const data = {
      email: resetPasswordEmail,
    };
    fetch(`${import.meta.env.VITE_URL}/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          message.success('Password reset email sent successfully!');
          setResetPasswordModalVisible(false);
        } else {
          message.error('Failed to send password reset email. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error during password reset:', error);
        message.error('An error occurred. Please try again later.');
      });
  };

  const handleRegister = () => {
    // Aquí puedes enviar la solicitud para registrar un nuevo usuario
    const data = {
      email: registerEmail,
      password: registerPassword,
    };
    fetch(`${import.meta.env.VITE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          message.success('User registered successfully!');
          setRegisterModalVisible(false);
        } else {
          message.error('Failed to register user. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error during user registration:', error);
        message.error('An error occurred. Please try again later.');
      });
  };

  const onFinish = (values) => {
    const captchaValue = captchaRef.current.getValue();
    if (!captchaValue) {
      message.error('Please complete the reCAPTCHA!');
      return;
    }
    const data = {
      email: values.username,
      password: values.password,
      // Otros datos que el endpoint pueda necesitar
    };
    fetch(`${import.meta.env.VITE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          message.success('Logged in successfully!');
          setLoggedIn(true);
          console.log('Login successful on the server side');
        } else {
          message.error('Incorrect username or password!');
          console.error('Server response was not ok');
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleResetPasswordModalCancel = () => {
    setResetPasswordModalVisible(false);
  };

  const handleRegisterModalCancel = () => {
    setRegisterModalVisible(false);
  };

  const showResetPasswordModal = () => {
    setResetPasswordModalVisible(true);
  };

  const showRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Restablecimiento de contraseña Modal */}
      <Modal
        title="Reset Password"
        visible={resetPasswordModalVisible}
        onOk={handleResetPassword}
        onCancel={handleResetPasswordModalCancel}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid email!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input onChange={(e) => setResetPasswordEmail(e.target.value)} />
        </Form.Item>
      </Modal>

      {/* Registro de usuario Modal */}
      <Modal
        title="Register"
        visible={registerModalVisible}
        onOk={handleRegister}
        onCancel={handleRegisterModalCancel}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid email!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input onChange={(e) => setRegisterEmail(e.target.value)} />
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
          <Input.Password onChange={(e) => setRegisterPassword(e.target.value)} />
        </Form.Item>
      </Modal>

      {/* Parte izquierda con la imagen */}
      <div style={{ flex: '65%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://source.unsplash.com/random?wallpapers" alt="Imagen" style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%' }} />
      </div>

      {/* Parte derecha con el formulario */}
      <div style={{ flex: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
          onFinish={onFinish}
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div style={{ display: 'flex', marginLeft: '-60px'}}>
            <Button type="link" onClick={showResetPasswordModal}>
                Forgot Password?
              </Button>
              <Button type="link" onClick={showRegisterModal} style={{ marginRight: '16px' }}>
                Register
              </Button>
            </div>
            <Button type="primary" htmlType="submit" style={{ marginTop: '10px', marginLeft: '23px'}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: '1rem', width: '300px', height: '100px', position: 'absolute', top: '70%', right: '7.25%' }}>
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={import.meta.env.VITE_APP_GOOGLE_CAPTCHA_KEY}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;