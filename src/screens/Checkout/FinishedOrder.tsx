import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { VStack, Text, HStack, Box, Heading } from "native-base";

export function FinishedOrder() {
  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Card marginTop={2}>
          <HStack justifyContent={"center"}>
            <Heading>Pagamento Realizado!</Heading>
          </HStack>
          <Text textAlign={"center"}>Obrigado! Recebemos seu pagamento</Text>
          <Text textAlign={"center"} my={2} fontFamily={"heading"}>
            {" "}
            Enviando para: R. Cristóvão Barreto, 1097 - Serraria Brasil, Feira
            de Santana - BA
          </Text>
        </Card>
      </VStack>

      <Box>
        <Button
          type="secondary"
          onPress={() => console.log()}
          title="Verificar meus pedidos"
        />
        <Button my={2} onPress={() => console.log()} title="Início" />
      </Box>
    </VStack>
  );
}
