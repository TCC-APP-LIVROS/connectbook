import { Header } from "@components/Header";
import { Center, VStack, Text, HStack, Image, Divider } from "native-base";

import { OtherUserProductsMock } from "../mocks/products";
import { ArrowArcRight, ArrowRight } from "phosphor-react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";

const Card = ({ product, mock, ...rest }: any) => {
  return (
    <Pressable {...rest}>
      <HStack
        rounded={"sm"}
        padding={2}
      >
        <Image
          source={{ uri: OtherUserProductsMock[0].product_images[0].path }}
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
            {OtherUserProductsMock[0].name}
          </Text>
          <Text
            color={mock == 1 ? "gray.500" : "green.700"}
            fontSize="md"
            fontWeight={"bold"}
          >
            {" "}
            {mock == 1 ? "Aguardando envio" : "Entregue"}
          </Text>
        </VStack>
        <Center flex={1} alignItems={"flex-end"}>
          <ArrowRight size={24} color={"#000"} />
        </Center>
      </HStack>
    </Pressable>
  );
};

export function Sales() {
  const navigation = useNavigation<AppNavigationRouteProps>();
  return (
    <VStack space={4} paddingX={4} safeAreaTop>
      <Header title="Vendas" backButton />
      <Card product={OtherUserProductsMock[0]} mock={1} onPress={() => navigation.navigate("SaleDetails")} />
        <Divider />
      <Card product={OtherUserProductsMock[1]} mock={2} onPress={() => navigation.navigate("SaleDetails")}/>
      <Divider />
      <Card product={OtherUserProductsMock[1]} mock={2} onPress={() => navigation.navigate("SaleDetails")}/>
    </VStack>
  );
}
