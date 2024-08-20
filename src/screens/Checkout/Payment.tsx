import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { RadioButton } from "@components/RadioButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { HStack, VStack } from "native-base";

export function Payment() {
const navigation = useNavigation<AppNavigationRouteProps>()
    
  function handleGoToCheckout() {
    navigation.navigate("ConfirmOrder")
  }

  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Header title={"Escolha o pagamento"} backButton />
        <Card title="Pagamento">
          <RadioButton />
        </Card>
      </VStack>
      <HStack justifyContent={"space-between"}>
        <Button width={"45%"} type="tertiary" title={"Voltar"} />
        <Button width={"45%"} title={"Avançar"} onPress={handleGoToCheckout} />
        </HStack>
    </VStack>
  );
}
