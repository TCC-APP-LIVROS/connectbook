import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { Pressable, VStack, Text } from "native-base";
import { Plus } from "phosphor-react-native";

type initialRouteProps = RouteProp<AppRoutes, "address">;

export function SelectAddress() {
  const route = useRoute<initialRouteProps>();
  const navigation = useNavigation<AppNavigationRouteProps>();

  //   const { address, helper } = route.params;

  function handleGoToEditAddress() {
    navigation.navigate("editAddress");
  }

  function handleGoBackToShippingMethod() {
    // navigation.navigate("address");
    //ou atualizar o endereço padrão e voltar para a tela de escolha de endereço. e chamar via api 
    // ou retornar para a tela enviando props e atualizando o endereço.
  }

  return (
    <VStack safeAreaTop paddingX={4}>
      <Header title="Escolha a forma de entrega" backButton />
      <Card
        title="Endereço padrão"
        text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
        editButtonTitle={"Editar"}
        onEditPress={handleGoToEditAddress}
      ></Card>

      <Pressable onPress={() => console.warn("go to..")}>
        <Card
          my={2}
          title="Selecionar esse endereço"
          text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
          onPress={() => console.warn("Press")}
          editButtonTitle={"Editar"}
          onEditPress={() => console.warn("Editar")}
        />
      </Pressable>

      <Pressable onPress={() => console.warn("go to..")}>
        <Card
          my={2}
          title="Selecionar esse endereço"
          text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
          onPress={() => console.warn("Press")}
          editButtonTitle={"Editar"}
          onEditPress={() => console.warn("Editar")}
        />
      </Pressable>

      <Card flexDirection={"row"} onPress={() => console.warn("go to..")}>
        <Plus size={24} />
        <Text mx={2} fontFamily={"heading"}>
          {" "}
          Adicionar novo endereço
        </Text>
      </Card>
    </VStack>
  );
}
