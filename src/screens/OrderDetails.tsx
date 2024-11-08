import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { OrderDetailsDTO } from "@dtos/OrdersDTO";
import { useAuth } from "@hooks/useAuth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import {
  Image,
  VStack,
  Text,
  Divider,
  HStack,
  ScrollView,
  useToast,
  Box,
  Heading,
} from "native-base";
import { useEffect, useState } from "react";

const carrouselImages =
  [{}, {}, {}]?.map(() => {
    return {
      uri: `https://cdn.mos.cms.futurecdn.net/U6NH3kQNCBP3eXcjyyMHHi.jpg`,
    };
  }) || [];

type initialRouteProps = RouteProp<AppRoutes, "OrderDetails">;

export function OrderDetails() {
  const navigation = useNavigation<AppNavigationRouteProps>();
  const { params } = useRoute<initialRouteProps>();
  const [order, setOrder] = useState<OrderDetailsDTO>({} as OrderDetailsDTO);
  const [loading, setIsLoading] = useState(true);
  const [cancel, setIsCancel] = useState(false);
  const toast = useToast();

  async function fetchOrders() {
    try {
      setIsLoading(true);
      const orders = await api.get(`/orders/detail/${params.orderId}/buyer/`);
      setOrder(orders.data);
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi Encontrar os produtos, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  }

  async function cancelOrder() {
    try {
      setIsLoading(true);
      await api.delete(`/orders/cancel/${params.orderId}/buyer/`);
      toast.show({
        title: "Pedido cancelado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível cancelar o pedido, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
      setIsCancel(false);
      fetchOrders();
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const AskCancelOrder = () => {
    return (
      <VStack
        flex={1}
        space={4}
        paddingX={4}
        safeAreaTop
        marginBottom={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading>Tem certeza que deseja cancelar o pedido?</Heading>
        <VStack width={"100%"} space={4}>
          <Button
            title={"Sim, cancelar"}
            backgroundColor={"#f00"}
            onPress={cancelOrder}
          />
          <Button title={"Não, voltar"} onPress={() => setIsCancel(false)} />
        </VStack>
      </VStack>
    );
  };

  if (cancel) {
    return <AskCancelOrder />;
  }

  return (
    <VStack space={4} paddingX={4} safeAreaTop marginBottom={10}>
      <Header title="PLACA DE VIDEO RTX 3090 FTW" backButton />
      <ScrollView marginBottom={10}>
        <VStack>
          {order.order.status != "CANCELLED" ? (
            <>
              <Text fontSize={"xxl"} fontWeight={"bold"}>
                Chega entre os dias{"\n"}xx julho e xx de julho
              </Text>
              <VStack></VStack>
              <Divider />
              <VStack space={4} marginTop={5}>
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
              <Button title={"Rastreio detalhado"} marginTop={5} />
            </>
          ) : (
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Pedido: {order.order.id}
              </Text>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {order.order.status}
              </Text>
            </HStack>
          )}
          <Divider />
          <VStack space={4} marginTop={5}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Informações sobre o endereço
            </Text>
            <Text fontSize={"md"}>{order.address.receiver_name}</Text>
            <Text fontSize={"md"}>
              Endereço:{" "}
              {`${order.address.street}, ${order.address.number} - ${order.address.neighborhood}`}
            </Text>
            <Text fontSize={"md"}>{order.address.complement}</Text>
            <Text
              fontSize={"md"}
            >{`${order.address.city} - ${order.address.state}, ${order.address.cep}`}</Text>
          </VStack>
          <Divider />
          <VStack space={4} marginTop={5}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Pagamento
            </Text>
            <Text fontSize={"md"}>INTER ****9021</Text>
            <Text fontSize={"md"}>Produto: R$13.999,99</Text>
            <Text fontSize={"md"}>Frete: R$ 87</Text>
            <Text fontSize={"md"}>1x 14.086,99</Text>
          </VStack>
          <Divider />
          {order.order.status != "CANCELLED" && (
            <Button
              title={"Cancelar Pedido"}
              backgroundColor={"#f00"}
              marginTop={5}
              onPress={() => setIsCancel(true)}
            />
          )}
          <Box h={50} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
