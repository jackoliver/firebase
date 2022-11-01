import { FormEventHandler, useState } from 'react';
import { useAuth } from '@fb/shared-auth';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'src/components/PrivateRoute';
import { Login, PrivateView } from 'routes';

const INITIAL_VALUES = {
  email: '',
  password: '',
};
export function App() {
  const { login } = useAuth();
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PrivateView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     onChange={handleChange}
    //     name="email"
    //     value={values.email}
    //     type="email"
    //     placeholder="Email"
    //   />
    //   <input
    //     onChange={handleChange}
    //     name="password"
    //     value={values.password}
    //     type="password"
    //     placeholder="Password"
    //   />
    //   <button>Sign up</button>
    // </form>
  );
}

export default App;
