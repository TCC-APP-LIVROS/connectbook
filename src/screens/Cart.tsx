import { Button } from "@components/Button";
import { CartCard } from "@components/CartCard";
import { Header } from "@components/Header";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import {
  VStack,
  Text,
  Heading,
  HStack,
  useToast,
  FlatList,
  Box,
} from "native-base";
import { useCallback, useState } from "react";
import { set } from "react-native-reanimated";

export function Cart() {
  const navigation = useNavigation<AppNavigationRouteProps>();
  const [cart, setCart] = useState<any[]>([]);
  const toast = useToast();
  const { user } = useAuth();

  async function fetchCart() {
    try {
      const cart = await api.get(`/cart/${user.id}/`);
      setCart(cart.data.items);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi carregar o carrinho, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  return (
    <VStack space={4} paddingX={4} flex={1} safeAreaTop>
      <Header title="Carrinho" backButton />
      <VStack flex={1}>
        <FlatList
          data={cart}
          ItemSeparatorComponent={() => <Box height={4} />}
          renderItem={({ item }) => (
            <CartCard
            image={item.image}
              titleCard={item.title}
              price={item.price}
              quantity={item.quantity}
              max_quantity={item.max_quantity}
            />
          )}
          keyExtractor={(item) => item.announcemente_id.toString()}
        />

        {/* <CartCard /> */}
      </VStack>
      <HStack justifyContent={"flex-end"}>
        <Heading>Total</Heading>
        <Text marginLeft={2}>R$ 1000,00</Text>
      </HStack>
      <Button
        title={"Finalizar compra"}
        onPress={() => navigation.navigate("ShippingMethod")}
      ></Button>
    </VStack>
  );
}
