import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

import userData from '../data/user.json';
import { useLocalStorage } from "./useLocalStorage";

export interface LoginParams {
  email: string;
  password: string;
  onSuccess: () => void;
  onError: (err: string) => void;
}

export interface User {
	email: string;
	name: string;
	picture?: string;
}

export interface Context {
	user?: User | null;
	setUser: (user: User | null) => void,
  isLoading: boolean;
	setLoading: (isLoading: boolean) => void,
	login: (params: LoginParams) => void;
	logout: () => void;
}

export const AuthContext = createContext({
	setUser: (user: User) => {},
  isLoading: false,
	setLoading: (isLoading: boolean) => {},
	login: (params: LoginParams) => {},
	logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(false);
	const [user, setUser] = useLocalStorage('user', {});
  const navigate = useNavigate();

	const login = useCallback(({ email, password, onSuccess, onError }: LoginParams) => {
    setLoading(true);
    setTimeout(() => {
      if (userData.email === email && userData.password === password) {
        setLoading(false);
				setUser(userData);
        onSuccess();
        return;
      }
      setLoading(false);
      onError('login error');
    }, 3000);
	}, [setUser]);

	const logout = useCallback(() => {
		setUser({});
    navigate('/', {replace: true});
	}, [navigate, setUser]);

	const value = useMemo(
		() => ({
			user,
			setUser,
      isLoading,
			setLoading,
			login,
			logout,
		}),
		[user, setUser, isLoading, setLoading, login, logout]
	);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
};

export const useAuth = () => {
	return useContext(AuthContext) as Context;
};
