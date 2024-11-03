import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { VStack, Text, HStack, Box, Heading } from "native-base";
import { CheckCircle  } from "phosphor-react-native";

type initialRouteProps = RouteProp<AppRoutes, "FinishedOrder">;

export function FinishedOrder() {
  const { params } = useRoute<initialRouteProps>();
  const navigation = useNavigation<AppNavigationRouteProps>()
  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Card marginTop={2}>
          <HStack justifyContent={"center"}>
            <Heading>Pagamento Realizado!</Heading>
          </HStack>
          <Text textAlign={"center"}>Obrigado! Recebemos seu pagamento</Text>
        </Card>
      </VStack>

    <HStack flex={1} justifyContent={"center"}>
      <CheckCircle size={24 * 4} color="#7cfc00"/>
    </HStack>
      
      <Box>
        <Button my={2} onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'bottomTabsRoutes' }]
        })} title="Início" />
      </Box>
    </VStack>
  );
}
