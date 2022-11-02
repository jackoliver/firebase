import { css } from '@emotion/react';
import { FormEventHandler, useState } from 'react';
import { useAuth } from '@fb/shared-auth';
import { Link, Navigate } from 'react-router-dom';
import { Input, Button, Box } from '@mantine/core';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const STYLES = {
  base: css`
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

export const Signup = () => {
  // TODO: use the useAuth hook to get the createAccount function
  const { user } = useAuth();
  const [values, setValues] = useState({
    ...INITIAL_VALUES,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Replace me with a call to the AuthProvider's createAccount method
    alert(JSON.stringify(values));
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
          name="firstName"
          value={values.firstName}
          type="text"
          placeholder="First name"
          size="md"
        />
        <Input
          onChange={handleChange}
          name="lastName"
          value={values.lastName}
          type="text"
          placeholder="Last name"
          size="md"
        />
        <Input
          onChange={handleChange}
          name="email"
          value={values.email}
          type="email"
          placeholder="Email"
          size="md"
        />
        <Input
          onChange={handleChange}
          name="password"
          value={values.password}
          type="password"
          placeholder="Password"
          size="md"
        />
        <Button variant="gradient" type="submit" size="md" fullWidth>
          Sign up
        </Button>
        <Link to="/login">Already have an account? Log in</Link>
      </Box>
    </form>
  );
};
