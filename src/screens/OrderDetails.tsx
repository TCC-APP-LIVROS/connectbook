import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Image, VStack, Text, Divider, HStack, ScrollView } from "native-base";

const carrouselImages =
  [{}, {}, {}]?.map(() => {
    return {
      uri: `https://cdn.mos.cms.futurecdn.net/U6NH3kQNCBP3eXcjyyMHHi.jpg`,
    };
  }) || [];

export function OrderDetails() {
  return (
    <ScrollView>
    <VStack space={4} paddingX={4} safeAreaTop>
      <Header title="PLACA DE VIDEO RTX 3090 FTW" backButton />
      <Text fontSize={"xxl"} fontWeight={"bold"}>
        Chega entre os dias{"\n"}xx julho e xx de julho
      </Text>
      <VStack></VStack>
      <Divider />
      <VStack space={4}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Rastreio
        </Text>
        <Text fontSize={"md"} fontWeight={"bold"}>
          Ultimo Status
        </Text>
        <Text fontSize={"md"}>
          Encaminhado de CTE SSA para CTE FSA : 22/07/2021 10:00
        </Text>
      </VStack>

      <Button title={"Rastreio detalhado"} />
      <Divider />
      <VStack space={4}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Informações sobre o endereço
        </Text>
        <Text fontSize={"md"}>John Doe</Text>
        <Text fontSize={"md"}>Rua: Rua do exemplo, 123</Text>
        <Text fontSize={"md"}>Complento vai aqui</Text>
        <Text fontSize={"md"}>Feira de Santana, BA 44088-000</Text>
      </VStack>
      <Divider />
      <VStack space={4}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Pagamento
        </Text>
        <Text fontSize={"md"}>INTER ****9021</Text>
        <Text fontSize={"md"}>Produto: R$13.999,99</Text>
        <Text fontSize={"md"}>Frete: R$ 87</Text>
        <Text fontSize={"md"}>1x 14.086,99</Text>
      </VStack>
      <Divider />
      <Button title={"Cancelar Pedido"} backgroundColor={"#f00"} />
    </VStack>
    </ScrollView>
  );
}
