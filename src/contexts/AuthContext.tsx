import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { AppError } from "@utils/AppError";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextType = {
  user: UserDTO;
  isLoadingUserData: boolean;
  SignIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  async function localUserAndAuthTokenSave(
    user: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      await storageUserSave(user);
      await storageAuthTokenSave(token, refresh_token);
    } catch (error) {
      throw error;
    }
  }

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.authorization = `Bearer ${token}`;
    setUser(userData);
  }

  async function SignIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token && data.refresh_token) {
        await localUserAndAuthTokenSave(
          data.user,
          data.token,
          data.refresh_token
        );
        await userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function checkLocalStorageAuth() {
    try {
      setIsLoadingUserData(true);
      const user = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (user && token) {
        await userAndTokenUpdate(user, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      setUser({} as UserDTO);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  useEffect(() => {
    checkLocalStorageAuth();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ user, signOut, isLoadingUserData, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}
