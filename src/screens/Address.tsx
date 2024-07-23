import { AddressCard } from "@components/AddressCard";
import { Header } from "@components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { VStack } from "native-base";

type initialRouteProps = RouteProp<AppRoutes, "address">;

export function Address() {
  const route = useRoute<initialRouteProps>();
  const navigation = useNavigation<AppNavigationRouteProps>();

//   const { address, helper } = route.params;

  function handleGoToEditAddress() {
    navigation.navigate("editAddress");
  }

  return (
    <VStack safeAreaTop paddingX={4}>
      <Header title="Endereço" backButton />
      <AddressCard address="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA" 
        shipping={true}
        onPress={handleGoToEditAddress}
      
      />
    </VStack>
  );
}
