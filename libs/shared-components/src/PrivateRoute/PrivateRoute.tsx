import { Navigate } from 'react-router-dom';
import { useAuth } from '@fb/shared-auth';

interface IPrivateRouteProps {
  children: React.ReactNode;
}
export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { user } = useAuth();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user ? <>{children}</> : <Navigate to="/login" />;
};
