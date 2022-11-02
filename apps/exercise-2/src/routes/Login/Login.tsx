import { css } from '@emotion/react';
import { FormEventHandler, useState } from 'react';
import { useAuth } from '@fb/shared-auth';
import { Link, Navigate } from 'react-router-dom';
import { Input, Button, Box } from '@mantine/core';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

const STYLES = {
  base: css`
    background: #f3f3f3;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  box: css`
    background: white;
    border-radius: 2px;
    padding: 20px;
    width: 350px;
    box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);

    > * {
      margin-bottom: 8px;
    }

    a {
      text-align: center;
      display: block;
      font-size: 0.9rem;
      line-height: 1;
      margin-top: 16px;
    }
  `,
};

export const Login = () => {
  const { user, login } = useAuth();
  const [values, setValues] = useState({
    ...INITIAL_VALUES,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    login(values);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form css={STYLES.base} onSubmit={handleSubmit}>
      <Box css={STYLES.box}>
        <Input
          onChange={handleChange}
          name="email"
          value={values.email}
          type="email"
          size="md"
          placeholder="Email"
          required
        />
        <Input
          onChange={handleChange}
          name="password"
          value={values.password}
          type="password"
          size="md"
          placeholder="Password"
          required
        />
        <Button variant="gradient" size="md" type="submit" fullWidth>
          Log in
        </Button>
        <Link to="/signup">Create an account</Link>
      </Box>
    </form>
  );
};
