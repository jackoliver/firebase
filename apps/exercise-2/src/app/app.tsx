import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'components';
import { Login, PrivateView, Signup } from 'routes';

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
