import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { AddressDTO } from "@dtos/AdressDTO";
import { useAuth } from "@hooks/useAuth";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, useToast, VStack, Text, Box, Spinner } from "native-base";
import { useCallback, useState } from "react";

type initialRouteProps = RouteProp<AppRoutes, "address">;

export function Address() {
  const route = useRoute<initialRouteProps>();
  const { user } = useAuth();
  const toast = useToast();
  const navigation = useNavigation<AppNavigationRouteProps>();
  const [address, setAddress] = useState<AddressDTO[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  //   const { address, helper } = route.params;
  async function fetchAdresses() {
    try {
      setIsFetching(true);
      const { data } = await api.get<{ addresses: AddressDTO[] }>(
        `/auths/user_address/${user.id}`
      );


      setAddress(data.addresses);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível encontrar os produtos, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
      setAddress([]);
    } finally {
      setIsFetching(false);
    }
  }

  function handleEditAddress(address: AddressDTO) {
    navigation.navigate("editAddress", { mode: "edit", address });
  }
  
  async function handleDeleteAddress(address: AddressDTO) {
    // navigation.navigate("editAddress", { mode: "edit", address });
    //Adicionar modal pedindo confirmação do usuário
    await api.delete(`/auths/user_address_delete/${address.id}/`);
    fetchAdresses();
    //API CALL
  }

  function handleCreateAddress() {
    navigation.navigate("editAddress", { mode: "create" });
  }

  useFocusEffect(
    useCallback(() => {
      fetchAdresses();
    }, [])
  );

  function EmptyList() {
    return (
      <Box mb={5} flex={1} justifyContent="flex-end">
        <Box flex={1} />
        <Text textAlign="center" mb={5}>
          Nenhum endereço cadastrado. Que tal adicionar o primeiro endereço
          antes de começar as compras?
        </Text>
        <Box flex={1} />
        <Button
          mt={5}
          title="Adicionar Endereço"
          onPress={handleCreateAddress}
        />
      </Box>
    );
  }
  return (
    <VStack safeAreaTop paddingX={4} flex={1}>
      <Header title="Endereço" backButton />

      {isFetching ? (
        <Spinner />
      ) : (
        <FlatList
          data={address}
          renderItem={({ item }) => (
            <Card
              text={`${item.street}, ${item.number} - ${item.neighborhood}, ${item.city} - ${item.state}`}
              editButtonTitle={"Editar"}
              onEditPress={() => handleEditAddress(item)}
              deleteButtonTitle={"Remover"}
              onDeletePress={() => handleDeleteAddress(item)}
              mb={2}
            />
          )}
          ListEmptyComponent={<EmptyList />}
          contentContainerStyle={address.length > 0 ? {} : { flex: 1 }}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isFetching}
        />
      )}
    </VStack>
  );
}
