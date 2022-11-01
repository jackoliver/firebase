import { useAuth } from '@fb/shared-auth';

export const PrivateView = () => {
  const { logout } = useAuth();
  return (
    <div>
      Private View!!!!
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
};
