import { useCallback, useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Text,
  Box,
  Icon,
  useTheme,
  FlatList,
  Actionsheet,
  useDisclose,
  Heading,
  Pressable,
  useToast,
  Badge,
} from "native-base";
import { ArrowRight, Plus, ShoppingCart, Tag, X } from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import queryString from "query-string";

import { AppNavigationRouteProps } from "@routes/app.routes";
import { allPaymentMethods } from "@dtos/PaymentMethodsDTO";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { Toggle } from "@components/Toggle";
import { Switch } from "@components/Switch";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";
import { Checkbox } from "@components/Checkbox";
import { Loading } from "@components/Loading";
import { ListingDTO } from "@dtos/ListingDTO";
import { TouchableOpacity } from "react-native";
import { userProductsMock, OtherUserProductsMock } from "../mocks/products";

type FilterOptions = {
  is_new?: boolean;
  accept_trade?: boolean;
  payment_methods: string[];
  query?: string;
};

export function Home() {
  const navigation = useNavigation<AppNavigationRouteProps>();
  const { user } = useAuth();
  const { colors } = useTheme();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [listings, setListings] = useState<any[]>([]);
  const [userListings, setUserListings] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState<FilterOptions>({
    is_new: undefined,
    accept_trade: undefined,
    payment_methods: [],
    query: undefined,
  });
  const [isFetchingFilteredProducts, setIsFetchingFilteredProducts] =
    useState(false);

  const PaymentOptions = allPaymentMethods.map((payment) => {
    return { title: payment, value: payment };
  });

  function handleOnChangeFilter(change: Partial<FilterOptions>) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...change,
    }));
  }

  function handleSearch() {
    handleOnChangeFilter({ query: search });
  }

  function handleGoToProfile() {
    navigation.navigate("profile");
  }

  function handleGoToCreateListing() {
    navigation.navigate("createListing", { mode: "create" });
  }

  function handleGoToListingDetails(item: ListingDTO) {
    navigation.navigate("listingDetails", item);
  }
  function handleGoToMyListing() {
    navigation.navigate("bottomTabsRoutes", { screen: "myListing" });
  }

  async function fetchUserProducts() {
    try {
      // const { data } = await api.get(`/users/products`);
      const data = userProductsMock
    
      setUserListings(data.length);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível encontrar os produtos do usuário, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
      setUserListings(0);
    }
  }

  async function fetchProducts() {
    try {
      setIsFetching(true);
      // const { data } = await api.get(`/products`);
      const data = OtherUserProductsMock
      setListings(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi Encontrar os produtos, tente novamente mais tarde";

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

  async function fetchFilteredProducts(filters: FilterOptions) {
    try {
      setIsFetching(true);
      setIsFetchingFilteredProducts(true);
      const stringifiedFilters = queryString.stringify(filters);
      // const { data } = await api.get(`/products?${stringifiedFilters}`);
      const data = OtherUserProductsMock
      setListings(data);
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
      setListings([]);
    } finally {
      setIsFetching(false);
      setIsFetchingFilteredProducts(false);
    }
  }

  async function handleFilterProducts() {
    await fetchFilteredProducts(filter);
    onClose();
  }

  async function handleClearFilter() {
    setFilter({
      is_new: undefined,
      accept_trade: undefined,
      payment_methods: [],
      query: undefined,
    });
    setSearch("");
    await fetchProducts();
  }
  useFocusEffect(
    useCallback(() => {
      fetchUserProducts();
      fetchProducts();
    }, [])
  );

  useEffect(() => {
    fetchFilteredProducts(filter);
  }, [filter]);

  return (
    <VStack flex={1} px={6} bg="gray.200">
      <HStack mt="16">
        <TouchableOpacity onPress={handleGoToProfile}>
          <Avatar
            source={{ uri: `https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-estudante-icone-de-perfil-de-usuario-avatar-de-jovem_118339-4402.jpg` }}
            size="11.25"
          />
          {/* <Avatar
            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
            size="11.25"
          /> */}
        </TouchableOpacity>
        <VStack flex={1} ml="2.5">
          <Text>Boas vindas,</Text>
          <Text fontFamily="heading">{user.name}</Text>
        </VStack>
        {/* <Button
          startIcon={<Icon as={<ShoppingCart color="#fff" size="16" />} />}
            rounded={"full"}
          onPress={handleGoToCreateListing}
        /> */}
        <Icon as={<ShoppingCart color="#000" size="30" />} />
      </HStack>

      {/* <VStack mt="8">
        <Text color="gray.500">Seus produtos anunciados para venda </Text>
        <HStack
          alignItems="center"
          h="16"
          mt="4"
          py="3"
          px="5"
          borderRadius="sm"
          bg="#DFE1EA"
        >
          <Box>
            <Tag color={colors.blue[800]} />
          </Box>
          <VStack ml="4" flex={1}>
            <Text color="gray.600" fontFamily="heading">
              {userListings}
            </Text>
            <Text color="gray.600">Anúncios ativos</Text>
          </VStack>
          <Pressable onPress={handleGoToMyListing} _pressed={{ opacity: 0.4 }}>
            <HStack alignItems="center">
              <Text color="blue.800" fontFamily="heading" mr="2">
                Meus anúncios
              </Text>
              <Icon as={<ArrowRight color={colors.blue[800]} size="16" />} />
            </HStack>
          </Pressable>
        </HStack>
      </VStack> */}

      <VStack mt="4" flex={1}>
        <Text mb="4" color="gray.500">
          Compre produtos variados
        </Text>
        <Input
          placeholder="Pesquisar"
          variant="search"
          onFilterPress={onOpen}
          value={search}
          onChangeText={setSearch}
          onSearchPress={handleSearch}
          mb="4"
        />
        {isFetching ? (
          <Loading />
        ) : (
          <FlatList
            data={listings}
            keyExtractor={(item) => item.id}
            numColumns={2}
            _contentContainerStyle={{
              paddingBottom: 100,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                mx="2"
                mb="6"
                image={{
                  uri: `https://cdn.mos.cms.futurecdn.net/U6NH3kQNCBP3eXcjyyMHHi.jpg`,
                }}
                onPress={() => handleGoToListingDetails(item)}
                avatarImage={{
                  uri: `https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg`,
                }}
                title={item.name}
                price={item.price / 100}
                isNew={item.is_new}
              />
            )}
            refreshing={isFetching}
            ListEmptyComponent={() => (
              <VStack flex={1} justifyContent="center" alignItems="center">
                <Text color="gray.500">Nenhum produto encontrado</Text>
              </VStack>
            )}
          />
        )}
      </VStack>
      <VStack>
        {/* eu quero dar um refactor e usar outro ao inves do actionsheet possivelmente */}
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content bgColor="gray.200" px="6">
            <HStack
              w="100%"
              h={60}
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading fontSize="xl" color="gray.700" fontFamily="heading">
                Filtrar anúncios
              </Heading>
              <Pressable onPress={onClose}>
                <X size={24} color={colors.gray[400]} />
              </Pressable>
            </HStack>
            <Box w="100%" mt="6">
              <Heading fontSize="sm" color="gray.600" fontFamily="heading">
                Condição
              </Heading>
              <HStack mt="3">
                <Toggle
                  title="Novo"
                  onPress={() =>
                    handleOnChangeFilter({
                      is_new: filter.is_new == true ? undefined : true,
                    })
                  }
                  value={filter.is_new == true}
                />
                <Toggle
                  title="Usado"
                  onPress={() =>
                    handleOnChangeFilter({
                      is_new: filter.is_new == false ? undefined : false,
                    })
                  }
                  value={filter.is_new == false}
                  ml="2"
                />
              </HStack>
            </Box>
            <Box w="100%" mt="6">
              <Heading fontSize="sm" color="gray.600" fontFamily="heading">
                Aceita troca?
              </Heading>
              <Switch
                onToggle={() =>
                  handleOnChangeFilter({
                    accept_trade: !filter.accept_trade,
                  })
                }
                value={filter.accept_trade}
                mt="3"
              />
            </Box>
            <Box w="100%" mt="6">
              <Heading fontSize="sm" color="gray.600" fontFamily="heading">
                Meios de Pagamento
              </Heading>
              <Checkbox
                options={PaymentOptions}
                value={filter.payment_methods}
                onChange={(value) =>
                  handleOnChangeFilter({ payment_methods: value })
                }
              />
            </Box>
            <Box w="100%" mt="6">
              <HStack justifyContent="space-between" space="3">
                <Button
                  flex="1"
                  title={"Resetar filtros"}
                  type="tertiary"
                  onPress={handleClearFilter}
                  isLoading={isFetchingFilteredProducts}
                />
                <Button
                  flex="1"
                  title={"Aplicar filtros"}
                  onPress={handleFilterProducts}
                  isLoading={isFetchingFilteredProducts}
                />
              </HStack>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </VStack>
  );
}
