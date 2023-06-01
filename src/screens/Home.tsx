import { useCallback, useState } from "react";
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
} from "native-base";
import { ArrowRight, Plus, Tag, X } from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigationRouteProps } from "@routes/app.routes";
import { paymentMethods } from "@dtos/ListingDTO";
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

  const PaymentOptions = paymentMethods.map((payment) => {
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

  function handleGoToCreateListing() {
    navigation.navigate("createListing");
  }

  function handleGoToListingDetails(id: string) {
    navigation.navigate("listingDetails", { listingId: id });
  }
  function handleGoToMyListing() {
    navigation.navigate("bottomTabsRoutes", { screen: "myListing" });
  }

  function createQueryString(obj: any) {
    const queryString = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (value !== undefined) {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              value.forEach((item) =>
                queryString.push(
                  `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
                )
              );
            }
          } else {
            queryString.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          }
        }
      }
    }

    return `?${queryString.join("&")}`;
  }

  async function fetchUserProducts() {
    try {
      const { data } = await api.get(`/users/products`);
      setUserListings(data.length);
    } catch (error) {}
  }

  async function fetchProducts() {
    try {
      setIsFetching(true);
      const { data } = await api.get(`/products`);
      setListings(data);
    } catch (error) {
      console.log(error);
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
      const qs = createQueryString(filters);
      const { data } = await api.get(`/products${qs}`);
      setListings(data);
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
      setListings([]);
    } finally {
      setIsFetching(false);
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
    await fetchProducts();
  }
  useFocusEffect(
    useCallback(() => {
      fetchUserProducts();
      fetchProducts();
    }, [])
  );
  return (
    <VStack flex={1} px={6} bg="gray.200">
      <HStack mt="16">
        <Avatar
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
          size="11.25"
        />
        <VStack flex={1} ml="2.5">
          <Text>Boas vindas,</Text>
          <Text fontFamily="heading">{user.name}</Text>
        </VStack>
        <Button
          startIcon={<Icon as={<Plus color="#fff" size="16" />} />}
          title={"Criar anúncio"}
          onPress={handleGoToCreateListing}
        />
      </HStack>

      <VStack mt="8">
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
      </VStack>

      <VStack mt="4" flex={1}>
        <Text mb="4" color="gray.500">
          Compre produtos variados
        </Text>
        <Input
          placeholder="Pesquisar"
          variant="search"
          onFilterPress={onOpen}
          onChangeText={setSearch}
          onSearchPress={handleSearch}
        />
        {isFetching ? (
          <Loading />
        ) : (
          <FlatList
            data={listings}
            keyExtractor={(item) => item.id}
            numColumns={2}
            _contentContainerStyle={{
              justifyContent: "space-between",
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                mx="2"
                mb="6"
                image={{
                  uri: `${api.defaults.baseURL}/images/${item.product_images[0].path}`,
                }}
                onPress={() => handleGoToListingDetails(item.id)}
                avatarImage={{
                  uri: `${api.defaults.baseURL}/images/${item.user.avatar}`,
                }}
                title={item.name}
                price={item.price}
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
                />
                <Button
                  flex="1"
                  title={"Aplicar filtros"}
                  onPress={handleFilterProducts}
                />
              </HStack>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </VStack>
  );
}
