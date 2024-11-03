import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { AddressDTO } from "@dtos/AdressDTO";
import { useAuth } from "@hooks/useAuth";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Pressable, VStack, Text, HStack, ScrollView, useToast, FlatList } from "native-base";
import { Plus } from "phosphor-react-native";
import { useCallback, useState } from "react";

type initialRouteProps = RouteProp<AppRoutes, "SelectAddress">;

export function SelectAddress() {
  const route = useRoute<initialRouteProps>();
  const { user } = useAuth();
  const toast = useToast();
  const [address, setAddress] = useState<any[]>([]);
  const navigation = useNavigation<AppNavigationRouteProps>();

  //   const { address, helper } = route.params;
  function handleGoToNextStep(id: number) {
    navigation.navigate("Shipping", { addressId: id, ...route.params });
}

function handleEditAddress(address: AddressDTO) {
  navigation.navigate("editAddress", { mode: "edit", address });
}

  async function loadAddress() {
    try {
      const addresses = await api.get(`auths/user_address/${user.id}/`)

      setAddress(addresses.data.addresses);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi Encontrar os endereços, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
      setAddress([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAddress();
    }, [])
  );

  function handleCreateAddress() {
    navigation.navigate("editAddress", { mode: "create" });
  }

  return (
    <VStack flex={1} safeAreaTop paddingX={4} >
   
      <Header title="Escolha a forma de entrega" backButton />
      <FlatList
        data={address}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Card
            title={item.nickname}
            text={`${item.street}, ${item.number} - ${item.neighborhood} ${item.city} - ${item.state}`}
            editButtonTitle={"Editar"}
            onEditPress={() => handleEditAddress(item)}
            onPress={() => handleGoToNextStep(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <HStack height={2} bg={"gray.200"} />}
        style={{ marginBottom: "10%" }}
        showsVerticalScrollIndicator={false}
      />

      <Card marginBottom={5} flexDirection={"row"} onPress={handleCreateAddress}>
        <Plus size={24} />
        <Text mx={2} fontFamily={"heading"}>
          {" "}
          Adicionar novo endereço
        </Text>
      </Card>
    </VStack>
  );
}
