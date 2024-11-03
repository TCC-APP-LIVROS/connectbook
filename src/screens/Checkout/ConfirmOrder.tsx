import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { VStack, Text, Image, HStack, Divider, Box, useToast } from "native-base";
import { useState } from "react";

type initialRouteProps = RouteProp<AppRoutes, "ConfirmOrder">;

export function ConfirmOrder() {
  const { params } = useRoute<initialRouteProps>();
  const navigation = useNavigation<AppNavigationRouteProps>()
  const { user } = useAuth();
  const toast = useToast();
  const [isLoadingListing, setIsLoadingListing] = useState(false);

  async function handleGoToFinishedOrder() {
    try {
      setIsLoadingListing(true);
      await api.post("/orders/create/", {
        buyer: user.id,
        announcement: params?.product?.id,
        quantity: params?.quantity,
        address: params?.addressId
      })
      
      navigation.navigate("FinishedOrder");
    } catch (error) {
      toast.show({
        title: "Error ao receber dados do anúncio",
        placement: "top",
        bgColor: "error.500",
      });
    }
    finally{
      setIsLoadingListing(false);
    }

  }

  if (isLoadingListing) {
    return <Loading />;
  }

  console.log(params);

  return (
    <VStack safeAreaTop paddingX={4} flex={1} paddingBottom={4}>
      <VStack flex={1}>
        <Header title={"Confirme a sua compra"} backButton />
        <Image
          source={{
            uri: "https://www.oficinadanet.com.br/imagens/post/27791/rtx-4090-foto_bottom-left.jpg",
          }}
          alt="imagem de produto"
          height={200}
        />

        <Card marginTop={2}>
          <HStack justifyContent={"space-between"}>
            <Text>Produto</Text>
            <Text>R$ {(params?.product?.price * params?.quantity).toFixed(2)}</Text>
          </HStack>

          <HStack justifyContent={"space-between"}>
            <Text>Frete</Text>
            <Text>R$ {params?.shippingMethodPrice}</Text>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent={"space-between"}>
            <Text>Total</Text>
            <Text>R$ {(parseFloat(params?.product?.price) * parseInt(params?.quantity)) + parseFloat(params?.shippingMethodPrice)}</Text>
          </HStack>
        </Card>

        <Card
          my={2}
          title="Enviar para"
          text="R. Cristóvão Barreto, 1097 - Serraria BrasilFeira de Santana - BA"
          editButtonTitle={"Alterar o endereço"}
          onEditPress={() => navigation.navigate("SelectAddress")}
          // onPress={handleGoToEditAddress}
        />

        <Card
          my={2}
          title="Pagar com"
          text={params?.paymentMethodTitle}
          editButtonTitle={"Alterar o método de pagamento"}
          onEditPress={() => navigation.goBack()}
        />
      </VStack>

      <Box>
        <Button onPress={handleGoToFinishedOrder} title="Finalizar compra" />
      </Box>
    </VStack>
  );
}
