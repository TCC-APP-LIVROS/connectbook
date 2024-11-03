import { Text } from "react-native"
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { RadioButton } from "@components/RadioButton";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { HStack, Radio, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";

type initialRouteProps = RouteProp<AppRoutes, "Shipping">;

export function Shipping() {
  const { params } = useRoute<initialRouteProps>();
  const [value, setValue] = useState("");
  const toast = useToast();
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const navigation = useNavigation<AppNavigationRouteProps>();

  function handleGoToNextStep() {
    if(!value) {
      toast.show({
        title: "Selecione um método de envio",
        placement: "top",
        bgColor: "error.500",
      });
      return;
    }
    const price = shippingMethods.find((method) => method.id === value)?.price;
    navigation.navigate("Payment", { ...params, shippingMethodPrice: price });
  }

  function loadShippingMethods() {
    const mock = [
      {
        id: 2,
        title: "Entrega Rápida",
        description: "Receba seu pedido em até 2 dias",
        price: (params.addressId * 0.4 + Math.random() * (40 - 5) + 5).toFixed(2),
      },
      {
        id: 3,
        title: "Entrega Econômica",
        description: "Receba seu pedido em até 7 dias",
        price: (params.addressId * 0.2 + Math.random() * (20 - 5) + 5).toFixed(2),
      },
    ];
    setShippingMethods(mock);
  }
  
  useFocusEffect(
    useCallback(() => {
      loadShippingMethods();
    }, [])
  );

  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Header title={"Escolha o envio"} backButton />
        <Card title="Frete">
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            {shippingMethods.map((option) => (
              <Radio
                key={option.id.toString()}
                value={option.id}
                my={4}
                colorScheme={"blue"}
              >
                <Text style={{maxWidth: "90%"}}>
                {`${option.title} - ${option.description} - R$${option.price}`}

                </Text>
              </Radio>
            ))}
          </Radio.Group>
        </Card>
      </VStack>
      <HStack justifyContent={"space-between"}>
        <Button width={"45%"} type="tertiary" title={"Voltar"} />
        <Button width={"45%"} title={"Avançar"} onPress={handleGoToNextStep} />
      </HStack>
    </VStack>
  );
}
