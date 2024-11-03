import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { RadioButton } from "@components/RadioButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { HStack, VStack, Text, Radio, useToast } from "native-base";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";

type initialRouteProps = RouteProp<AppRoutes, "Payment">;

export function Payment() {
  const navigation = useNavigation<AppNavigationRouteProps>();
  const toast = useToast();
  const { params } = useRoute<initialRouteProps>();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [value, setValue] = useState("");

  function handleGoToNextStep() {
    if(!value) {
      toast.show({
        title: "Selecione um método de envio",
        placement: "top",
        bgColor: "error.500",
      });
      return;
    }
    const payment = paymentMethods.find((method) => method.id === value)
    navigation.navigate("ConfirmOrder", { ...params, paymentMethodTitle: payment.title });
  }

  function loadPaymentMethods() {
    const mock = [
      {
        id: 1,
        title: "Mastercard **** **** **** *834",
        icon: <FontAwesome5 name="cc-mastercard" size={24} color="black" />,
      },
      {
        id: 2,
        title: "Mastercard **** **** **** *834",
        icon: <FontAwesome5 name="cc-visa" size={24} color="black" />,
      },
      {
        id: 3,
        title: "Pix",
        icon: <FontAwesome5 name="cc-visa" size={24} color="black" />,
      },
    ];
    setPaymentMethods(mock);
  }

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Header title={"Escolha o método de pagamento"} backButton />
        <Card title="Frete">
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            {paymentMethods.map((option) => (
              <Radio
                key={option.id.toString()}
                value={option.id}
                my={4}
                colorScheme={"blue"}
              >
                {option.icon}
                <Text style={{ maxWidth: "90%" }}>{option.title}</Text>
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
