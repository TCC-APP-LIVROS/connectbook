import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageUserSave } from "@storage/storageUser";
import { AppError } from "@utils/AppError";
import { ReactNode, createContext, useState } from "react";

export type AuthContextType = {
  user: UserDTO;
  isLoadingUserData: boolean;
  SignIn: (email: string, password: string) => Promise<void>;
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

  async function authorizationHeaderUpdate(token: string) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  async function SignIn(email: string, password: string) {
    try {
      setIsLoadingUserData(true);
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token && data.refresh_token) {
        await localUserAndAuthTokenSave(
          data.user,
          data.token,
          data.refresh_token
        );
        await authorizationHeaderUpdate(data.token);

        setUser(data.user);
        
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoadingUserData, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}
