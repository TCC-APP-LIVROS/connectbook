import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Image, VStack, Text, Divider, HStack, ScrollView, Box } from "native-base";

const carrouselImages =
  [{}, {}, {}]?.map(() => {
    return {
      uri: `https://cdn.mos.cms.futurecdn.net/U6NH3kQNCBP3eXcjyyMHHi.jpg`,
    };
  }) || [];

export function SaleDetails() {
  return (
    <ScrollView>
      <VStack space={4} paddingX={4} safeAreaTop>
        <Header title="PLACA DE VIDEO RTX 3090 FTW" backButton />
        <Text fontSize={"xxl"} fontWeight={"bold"}>
          Envie o produto até o dia xx de julho
        </Text>
        <VStack></VStack>
        <Divider />
        <VStack space={4}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Informações de envio
          </Text>
          <Text fontSize={"md"}>Envio por: XXXX</Text>
        </VStack>
        <Divider />
        <VStack space={4}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Pedido pronto para o envio
          </Text>
          <Text fontSize={"md"}>
            Siga as instruções para enviar o produto, imprima a etiqueta e cole
            na embalagem. Você deve levar o pacote em uma agência dos correios.
            <Text fontFamily={"heading"}> até DD/MM</Text>
          </Text>
          <Button type="tertiary" title={"Instruções de envio"} />
          <Button title={"Imprimir etiqueta"} />
          <Divider />
          <Box height={180}/>
        </VStack>
        <Button title={"Cancelar Pedido"} backgroundColor={"#f00"} />
      </VStack>
    </ScrollView>
  );
}
