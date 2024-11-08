import { Header } from "@components/Header";
import { Center, VStack, Text, HStack, Image, Divider, useToast, FlatList } from "native-base";

import { OtherUserProductsMock } from "../mocks/products";
import { ArrowArcRight, ArrowRight } from "phosphor-react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { useEffect, useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { set } from "react-native-reanimated";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";

const Card = ({ product, ...rest }: any) => {
  console.log(product);
  return (
    <Pressable {...rest}>
      <HStack
        rounded={"sm"}
        padding={2}
      >
        <Image
          source={{ uri: product.product.image }}
          alt="Imagem do produto"
          size={24}
          resizeMode="contain"
          backgroundColor={"#808080"}
        />
        <VStack marginLeft={5} justifyContent={"space-evenly"}>
          <Text
            fontFamily={"heading"}
            fontSize={"xl"}
            fontWeight={"bold"}
            maxWidth={200}
            numberOfLines={1}
          >
            {product.announcement.title}
          </Text>
          <Text
            color={true ? "gray.500" : "green.700"}
            fontSize="md"
            fontWeight={"bold"}
          >
            {" "}
            {product.status === "PENDING" ? "Em separação" : "Entregue"}
          </Text>
        </VStack>
        <Center flex={1} alignItems={"flex-end"}>
          <ArrowRight size={24} color={"#000"} />
        </Center>
      </HStack>
    </Pressable>
  );
};

export function Orders() {
  const navigation = useNavigation<AppNavigationRouteProps>();
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuth();
  
  const [loading, setIsLoading] = useState(true);
  const toast = useToast();
  async function fetchOrders() {
    
    try {
      setIsLoading(true);
      const orders = await api.get(`/orders/list/${user.id}/buyer/`);
      setOrders(orders.data.orders);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi Encontrar os produtos, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      setOrders([]);
    } finally{
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    fetchOrders();
  }
  , []);

  if(loading){
    return (<Loading />)
  }
  return (
    <VStack space={4} paddingX={4} safeAreaTop>
      <Header title="Pedidos" backButton />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card product={item} onPress={() => navigation.navigate("OrderDetails", { orderId: item.id})} />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </VStack>
  );
}
