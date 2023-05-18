import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useState } from "react";

export type AuthContextType = {
  user: UserDTO;
  isLoadingUserData: boolean;
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [ user, setUser ] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  return (
    <AuthContext.Provider value={{ user, isLoadingUserData }}>{children}</AuthContext.Provider>
  );
}
