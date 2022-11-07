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

const LoadMe = () => (
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
);

export const Auth: React.FC<IAuthProps> = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {auth.user === null ? <LoadMe /> : children}
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
    // Get the auth instance
    const auth = getAuth();

    // Create the user, then (important keyword!!) update the user's profile with their first and last name (you can use `displayName`)
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        updateProfile(response.user, {
          displayName: `${firstName} ${lastName}`,
        });
      })
      .catch(console.error);
  };

  const login = ({ email, password }: LoginArguments) => {
    // Get the auth instance
    const auth = getAuth();
    // Sign in with email and pass (do something with the resolved Promise – and don't forget to catch errors)
    return signInWithEmailAndPassword(auth, email, password).catch(
      console.error
    );
  };

  const logout = () => signOut(getAuth()).catch(console.error);

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
