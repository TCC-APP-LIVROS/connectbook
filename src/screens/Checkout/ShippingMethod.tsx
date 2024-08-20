import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { Pressable, VStack } from "native-base";

type initialRouteProps = RouteProp<AppRoutes, "address">;

export function ShippingMethod() {
  const route = useRoute<initialRouteProps>();
  const navigation = useNavigation<AppNavigationRouteProps>();

  //   const { address, helper } = route.params;

  function handleGoToEditAddress() {
    navigation.push("SelectAddress");
  }

  function handleGoToNextStep(){
    navigation.navigate("Shipping")
  }
  
  

  return (
    <VStack safeAreaTop paddingX={4}>
      <Header title="Escolha a forma de entrega" backButton />
      <Pressable onPress={() => console.log('go to..')}>
      <Card
        title="Enviar para meu endereço"
        text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
        onPress={handleGoToNextStep}
        editButtonTitle={"Editar ou escolher outro endereço"}
        onEditPress={handleGoToEditAddress}
      />
      </Pressable>
      
      <Card
        my={2}
        title="Retirar com o vendedor"
        onPress={handleGoToNextStep}
        text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
        editButtonTitle={"Editar"}
        onEditPress={() => console.log('Editar')}
      />
    </VStack>
  );
}
