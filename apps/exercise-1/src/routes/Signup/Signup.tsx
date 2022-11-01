import { FormEventHandler, useState } from 'react';
import { useAuth } from '@fb/shared-auth';
import { Link, Navigate } from 'react-router-dom';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const Signup = () => {
  const { createAccount, user } = useAuth();
  const [values, setValues] = useState({
    ...INITIAL_VALUES,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Replace me with a call to the AuthProvider's createAccount method
    alert(JSON.stringify(values));
    createAccount(values);
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
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="firstName"
        value={values.firstName}
        type="text"
        placeholder="First name"
      />
      <input
        onChange={handleChange}
        name="lastName"
        value={values.lastName}
        type="text"
        placeholder="Last name"
      />
      <input
        onChange={handleChange}
        name="email"
        value={values.email}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={handleChange}
        name="password"
        value={values.password}
        type="password"
        placeholder="Password"
      />
      <button>Sign up</button>
      <Link to="/login">Already have an account? Log in</Link>
    </form>
  );
};
