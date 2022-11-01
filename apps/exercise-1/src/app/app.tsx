import { Route, Routes } from 'react-router-dom';
import { Login, PrivateView, Signup } from 'routes';
import { PrivateRoute } from 'components';

export function App() {
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
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
