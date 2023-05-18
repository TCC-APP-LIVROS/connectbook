import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes() {
  const { user, isLoadingUserData } = useAuth();

  if (isLoadingUserData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.100">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
