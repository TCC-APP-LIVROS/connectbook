import { Button } from "@components/Button";
import { CartCard } from "@components/CartCard";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { VStack, Text, Heading, HStack } from "native-base";

export function Cart() {
  const navigation = useNavigation<AppNavigationRouteProps>()

  return (
    <VStack space={4} paddingX={4} flex={1} safeAreaTop>
      <Header title="Carrinho" backButton />
      <VStack flex={1}>
        <CartCard />
      </VStack>
      <HStack justifyContent={"flex-end"}>
        <Heading>Total</Heading>
        <Text marginLeft={2}>R$ 1000,00</Text>
      </HStack>
      <Button title={"Finalizar compra"} onPress={() => navigation.navigate('ShippingMethod')}></Button>
    </VStack>
  );
}
