import { FormEventHandler, useState } from 'react';
import { useAuth } from '@fb/shared-auth';
import { Link, Navigate } from 'react-router-dom';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

export const Login = () => {
  const { user, login } = useAuth();
  const [values, setValues] = useState({
    ...INITIAL_VALUES,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Replace me with a call to the AuthProvider's login method
    alert(JSON.stringify(values));
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
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="email"
        value={values.email}
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={handleChange}
        name="password"
        value={values.password}
        type="password"
        placeholder="Password"
        required
      />
      <button>Log in</button>
      <Link to="/signup">Create an account</Link>
    </form>
  );
};
