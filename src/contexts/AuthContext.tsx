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
import { userMock } from "../mocks/user";
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
  const [user, setUser] = useState<UserDTO>(userMock as any);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  // async function localUserAndAuthTokenSave(
  //   user: UserDTO,
  //   token: string,
  //   refresh_token: string
  // ) {
  //   try {
  //     await storageUserSave(user);
  //     await storageAuthTokenSave(token, refresh_token);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // substituto do localUserAndAuthTokenSave. não estamos usando JWT
  async function localUserSave(
    user: UserDTO,
  ) {
    try {
      await storageUserSave(user);
    } catch (error) {
      throw error;
    }
  }

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.authorization = `Bearer ${token}`;
    setUser(userData);
  }
  
  // substituto do userAndTokenUpdate. não estamos usando JWT
  async function userUpdate(userData: UserDTO,) {
    setUser(userData);
  }

  async function SignIn(username: string, password: string) {
    try {
      const { data } = await api.post<UserDTO>("/auths/login/", { username, password });
      
      if (data.id) {
        await localUserSave(data);
        await userUpdate(data);
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
