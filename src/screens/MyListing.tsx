import { useCallback, useState } from "react";
import { HStack, VStack, Text, FlatList, Box, useToast } from "native-base";
import { Plus } from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigationRouteProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Header } from "@components/Header";
import { Select } from "@components/Select";
import { ProductCard } from "@components/ProductCard";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { ListingDTO } from "@dtos/ListingDTO";
import { userProductsMock } from "../mocks/products";

export function MyListing() {
  const filterOptions = ["Todos", "Ativos", "Inativos"];
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [isFetching, setIsFetching] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const { user } = useAuth();
  const toast = useToast();
  const navigation = useNavigation<AppNavigationRouteProps>();

  const filteredProducts = listings.filter((item) => {
    if (selectedFilter === "Todos") {
      return true; // Retorna todos os produtos
    } else if (selectedFilter === "Ativos") {
      return item.is_active === true; // Retorna apenas produtos ativos
    } else if (selectedFilter === "Inativos") {
      return item.is_active === false; // Retorna apenas produtos inativos
    }
    return false; // Filtro inválido, não retorna nenhum produto
  });

  function handleGoToListingDetails(item: ListingDTO) {
    navigation.navigate("listingDetails", item);
  }
  function handleGoToCreateListing() {
    navigation.navigate("createListing", { mode: "create" });
  }

  async function fetchProducts() {
    try {
      setIsFetching(true);
      // const { data } = await api.get(`/users/products`);
      const data = userProductsMock
      setListings(data);
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
      setListings([]);
    } finally {
      setIsFetching(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <VStack flex={1} safeArea px="6" bg="gray.200">
      <Header
        title="Meus anúncios"
        rightButtonIcon={<Plus size={24} />}
        onPressRightButton={handleGoToCreateListing}
      />

      <HStack justifyContent={"space-between"} alignItems="center" mt="20">
        <Text color="gray.600">{filteredProducts.length} Anúncios</Text>
        <Select
          data={filterOptions}
          defaultValueByIndex={0}
          onSelect={(selectedItem) => {
            setSelectedFilter(selectedItem);
          }}
        />
      </HStack>
      <VStack mt="4" flex={1}>
        {/* da pra melhorar o espaçamento e estilo */}
        {isFetching ? (
          <Loading />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            _contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                mb={3}
                image={{
                  uri: `https://i.zst.com.br/thumbs/12/3d/11/-1202542340.jpg`,
                }}
                onPress={() => handleGoToListingDetails(item)}
                avatarImage={{
                  uri: `https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg`,
                }}
                title={item.name}
                price={item.price/100}
                isNew={item.is_new}
                isActive={item.is_active}
              />
            )}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            ListEmptyComponent={() => (
              <VStack flex={1} justifyContent="center" alignItems="center">
                <Text color="gray.500">
                  {
                    "Você não tem nenhum produto anunciado? \n que tal criar o seu primeiro?"
                  }
                </Text>
              </VStack>
            )}
          />
        )}
      </VStack>
    </VStack>
  );
}
