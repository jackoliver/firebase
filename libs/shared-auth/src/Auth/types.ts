import { User } from 'firebase/auth';

export type UserState = User | false | null;

export interface IAuthProps {
  children: React.ReactNode;
}
export interface CreateAccountArguments {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginArguments {
  email: string;
  password: string;
}

export interface UserContextProps {
  user: UserState;
  login: ({ email, password }: LoginArguments) => void;
  createAccount: ({
    firstName,
    lastName,
    email,
    password,
  }: CreateAccountArguments) => void;
  logout: () => void;
}
