import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { PaymentOptionCard } from "@components/PaymentOptions";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { FlatList, VStack } from "native-base";

type initialRouteProps = RouteProp<AppRoutes, "address">;

export function PaymentMethods() {
  const route = useRoute<initialRouteProps>();
  const navigation = useNavigation<AppNavigationRouteProps>();

  //   const { address, helper } = route.params;

  function handleGoToEditPayment() {
    navigation.navigate("EditPayment");
  }

  const card = [{}, {}, {}];
  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <Header title="Meus cartões" backButton />
      <FlatList
        data={card}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <VStack height={2} />}
        renderItem={({ item }) => (
          <PaymentOptionCard
            onPressDelete={() => console.log()}
            onPressEdit={handleGoToEditPayment}
            card={item}
          />
        )}
      />
      <Button title="Adicionar cartão" onPress={handleGoToEditPayment} />
    </VStack>
  );
}
