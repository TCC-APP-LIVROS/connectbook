import { Header } from "@components/Header";
import { Carrousel } from "@components/Carrousel";
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  useTheme,
  ScrollView,
  useToast,
} from "native-base";
import {
  Pencil,
  Power,
  ShoppingCart,
  TrashSimple,
  WhatsappLogo,
} from "phosphor-react-native";
import * as WebBrowser from "expo-web-browser";
import { Avatar } from "@components/Avatar";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { OtherUserProductsMock } from "../mocks/products";
import { Qna } from "@components/QnA";
import { Input } from "@components/Input";
import { QuantityPicker } from "@components/QuantityPicker";
import { ListingDTO } from "@dtos/ListingDTO";

type initialRouteProps = RouteProp<AppRoutes, "listingDetails">;

export function ListingDetails() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigationRouteProps>();
  const [isFetching, setIsFetching] = useState(true);
  const [listing, setListing] = useState<ListingDTO>({} as ListingDTO);
  const route = useRoute<initialRouteProps>();
  const params = route.params;
  const [quantity, setQuantity] = useState(1);

  const isDealer = listing?.seller?.id == parseInt(user?.id);

  const carrouselImages = listing.product?.image;

  async function fetchProduct() {
    setIsFetching(true);
    try {
      const { data } = await api.get(`/ads/announcement/${params.id}`);

      setListing(data);
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
      setListing(params);
    } finally {
      setIsFetching(false);
    }
  }

  async function handleChangeProductStatus() {
    try {
      setIsFetching(true);
      await api.put(`/ads/announcement/toggle/status/${params.id}`);
      setListing((oldState: any) => ({
        ...oldState,
        status: oldState.status == "activated" ? "disabled" : "activated",
      }));
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não possível atualizar o anuncio, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    } finally {
      setIsFetching(false);
    }
  }

  async function handleDeleteProduct() {
    try {
      setIsFetching(true);
      await api.delete(`/ads/announcement/delete/${params.id}/`);
      toast.show({
        title: "Anuncio excluido com sucesso",
        placement: "top",
        bgColor: "success.500",
      });
      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não possível atualizar o anuncio, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    } finally {
      setIsFetching(false);
    }
  }

  function handleGoToCreateListing() {
    navigation.navigate("createListing", {
      mode: "edit",
      listingId: params.id.toString(),
    });
  }

  async function goToWhatsapp(tel: string) {
    await WebBrowser.openBrowserAsync(`https://wa.me/${tel}`);
  }

  async function addCart(id: number) {
    try {
      await api.post(`/cart/add/`, {
        client_id: user.id,
        product_id: id,
        quantity: quantity,
      });

      toast.show({
        title: "Produto adicionado ao carrinho",
        placement: "top",
        bgColor: "success.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível adicionar ao carrinho, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    }
  }

  async function buy() {
    navigation.navigate("SelectAddress", {
      product: listing,
      quantity: quantity,
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [])
  );
  return (
    <VStack flex={1} safeAreaX safeAreaTop>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Box px="6" py={4}>
            <Header
              backButton
              rightButtonIcon={isDealer ? <Pencil size={24} /> : undefined}
              onPressRightButton={handleGoToCreateListing}
            >
              <Input
                placeholder="Pesquisar"
                variant="search"
                // onFilterPress={onOpen}
                // value={search}
                // onChangeText={setSearch}
                // onSearchPress={handleSearch}
              />
            </Header>

            <Heading fontSize="xl" fontFamily="heading" color="gray.700">
              {listing.title}
            </Heading>
          </Box>

          <VStack>
            <Carrousel
              images={[
                {
                  uri:
                    listing.product?.image ??
                    "https://media.licdn.com/dms/image/C4D12AQElMcNEch38WQ/article-cover_image-shrink_720_1280/0/1645152091261?e=2147483647&v=beta&t=cBzmomM3hef1Mcpbw5O9Afs_1zABFkeoHv_OoQJPRKE",
                },
              ]}
            />
            {listing.status == "activated" ? null : (
              <>
                <Box position="absolute" w="full" height="full">
                  <Box
                    position="absolute"
                    w="full"
                    height="full"
                    bg="gray.700"
                    opacity="0.6"
                    justifyContent={"center"}
                    alignItems={"center"}
                  />
                  <Heading
                    color="gray.100"
                    fontSize="xs"
                    fontFamily="heading"
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    top={"50%"}
                  >
                    {/* {listing?.user?.tel ? "Anúncio desativado" : ""} */}
                  </Heading>
                </Box>
              </>
            )}
          </VStack>

          <ScrollView
            flex="1"
            px="6"
            pt={3}
            pb={10}
            showsVerticalScrollIndicator={false}
          >
            <HStack>
              <Avatar
                source={{
                  uri: listing.seller_profile?.photo,
                }}
                size={6}
              />
              <Text fontSize="sm" color="gray.700" ml="2">
                {listing?.seller?.username}
                {/* {"username"} */}
              </Text>
            </HStack>

            <HStack>
              <Tag
                mt={4}
                title={listing.condition !== "usado" ? "Novo" : "Usado"}
                bgColor={
                  listing.condition !== "usado" ? "blue.600" : "gray.600"
                }
              />
            </HStack>

            <VStack
              mt={4}
              mb={2}
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Heading
                fontSize="2xl"
                fontFamily="heading"
                color="blue.600"
                lineHeight="xl"
              >
                R${" "}
                <Heading fontSize="3xl" fontFamily="heading" color="blue.600">
                  {Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat(listing.price))}
                </Heading>
              </Heading>
              <Text fontFamily="heading" color={"gray.600"}>
                {listing.quantity > 99 ? "99+" : listing.quantity} disponíveis
              </Text>
              {!isDealer && (
                <QuantityPicker
                quantity={quantity}
                onChange={setQuantity}
                maxQuantity={listing.quantity}
              />
              )}
            </VStack>

            {!isDealer && <VStack>
              <Button type="primary" title="Comprar agora" onPress={buy} />
              <Button
                type="secondary"
                startIcon={
                  <ShoppingCart size={24} weight="fill" color={colors.white} />
                }
                mt={2}
                title="Adicionar ao carrinho"
                onPress={() => listing.product && addCart(listing.product.id)}
              />
            </VStack>}

            <Heading
              mt={6}
              fontFamily="heading"
              fontSize="sm"
              color={"gray.600"}
            >
              Descrição:
            </Heading>

            <Text fontSize="sm" color={"gray.600"}>
              {listing.description}
            </Text>

            {/* <Heading
              mt={6}
              fontFamily="heading"
              fontSize="sm"
              color={"gray.600"}
            >
              Aceita troca?{"  "}
              <Text fontFamily="body" color={"gray.600"}>
                {listing.accept_trade ? "Sim" : "Não"}
              </Text>
            </Heading> */}

            {/* <Heading
              mt={6}
              fontFamily="heading"
              fontSize="sm"
              color={"gray.600"}
            >
              Meios de pagamento
            </Heading>
            {listing.payment_methods?.map((payment: any) => (
              <PaymentMethod
                key={payment.key}
                payment={payment.key}
                color={colors.gray[700]}
              />
            ))} */}

            {!isDealer && (
              <>
                <Heading
                  mt={6}
                  fontFamily="heading"
                  fontSize="sm"
                  color={"gray.600"}
                >
                  Perguntas e respostas:
                </Heading>
                <Qna question="Marca" answer={""} />
              </>
            )}

            {isDealer && (
              <>
                {listing.status == "activated" ? (
                  <Button
                    title="Desativar anúncio"
                    mt="8"
                    startIcon={<Power size={16} color={colors.gray[100]} />}
                    onPress={handleChangeProductStatus}
                  />
                ) : (
                  <Button
                    title="Reativar anúncio"
                    type="secondary"
                    mt="8"
                    startIcon={<Power size={16} color={colors.gray[100]} />}
                    onPress={handleChangeProductStatus}
                  />
                )}
                <Button
                  title="Excluir anúncio"
                  type="tertiary"
                  mt="2"
                  startIcon={<TrashSimple size={16} color={colors.gray[400]} />}
                  onPress={handleDeleteProduct}
                />
              </>
            )}
            <Box h="10" />
          </ScrollView>
        </>
      )}
    </VStack>
  );
}
