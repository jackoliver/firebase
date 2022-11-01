import { useState, useEffect, useContext, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Loader } from '@mantine/core';

import { firebaseConfig } from '@fb/shared-config';

import {
  CreateAccountArguments,
  UserContextProps,
  LoginArguments,
  UserState,
  IAuthProps,
} from './types';

initializeApp(firebaseConfig);

const authContext = createContext<UserContextProps>({
  user: null,
  login: () => {
    return null;
  },
  logout: () => {
    return null;
  },
  createAccount: () => {
    return null;
  },
});

export const Auth: React.FC<IAuthProps> = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {auth.user === null ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Loader size="xl" />
        </div>
      ) : (
        children
      )}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState<UserState>(null);

  const getToken = async (userInstance: User) => {
    return userInstance ? userInstance.getIdToken(true) : undefined;
  };

  const createAccount = ({
    firstName,
    lastName,
    email,
    password,
  }: CreateAccountArguments) => {
    return createUserWithEmailAndPassword(getAuth(), email, password)
      .then((response) => {
        updateProfile(response.user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            window.location.href = '/';
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const login = ({ email, password }: LoginArguments) => {
    return signInWithEmailAndPassword(getAuth(), email, password)
      .then((response) => {
        window.location.href = '/';
      })
      .catch(console.error);
  };

  const logout = () => {
    return signOut(getAuth()).catch(console.error);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (userInstance) => {
      if (userInstance) {
        const token = await getToken(userInstance);
        if (token) {
          localStorage.setItem('token', token);
          setUser(userInstance);
        } else {
          logout();
        }
      } else {
        localStorage.removeItem('token');
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return {
    user,
    createAccount,
    login,
    logout,
  };
}
