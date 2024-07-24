import { Button } from "@components/Button";
import { CartCard } from "@components/CartCard";
import { Header } from "@components/Header";
import { VStack, Text, Heading, HStack } from "native-base";

export function Cart() {
  return (
    <VStack space={4} paddingX={4} flex={1} safeAreaTop>
      <Header title="Carrinho" backButton />
      <VStack flex={1}>
        <CartCard />
      </VStack>
      <HStack>
        <Heading>Total</Heading>
        <Text>R$ 0,00</Text>
      </HStack>
      <Button title={"Finalizar compra"}></Button>
    </VStack>
  );
}
