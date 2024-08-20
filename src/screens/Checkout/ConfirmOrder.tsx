import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { VStack, Text, Image, HStack, Divider, Box } from "native-base";

export function ConfirmOrder() {
  const navigation = useNavigation<AppNavigationRouteProps>()
  
  function handleGoToFinishedOrder() {
    navigation.navigate("FinishedOrder");
  }

  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Header title={"Confirme a sua compra"} backButton />
        <Image
          source={{
            uri: "https://www.oficinadanet.com.br/imagens/post/27791/rtx-4090-foto_bottom-left.jpg",
          }}
          alt="imagem de produto"
          height={200}
        />

        <Card marginTop={2}>
          <HStack justifyContent={"space-between"}>
            <Text>Produto</Text>
            <Text>R$210,34</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>Frete</Text>
            <Text>R$20,34</Text>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent={"space-between"}>
            <Text>Total</Text>
            <Text>R$230,68</Text>
          </HStack>
        </Card>

        <Card
          my={2}
          title="Enviar para"
          text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
          editButtonTitle={"Editar ou escolher outro endereço"}
          onPress={() => console.log()}
          // onPress={handleGoToEditAddress}
        />

        <Card
          my={2}
          title="Pagar com"
          text="Pix"
          editButtonTitle={"Editar ou escolher outra forma de pagamento"}
          onPress={() => console.log()}
        />
      </VStack>

      <Box>
        <Button onPress={handleGoToFinishedOrder} title="Finalizar compra" />
      </Box>
    </VStack>
  );
}
