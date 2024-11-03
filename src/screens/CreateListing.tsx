import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Radio,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ListingDTO } from "@dtos/ListingDTO";
import { allPaymentMethods, PaymentMethod } from "@dtos/PaymentMethodsDTO";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { MultilineInput } from "@components/MultilineInput";
import { Switch } from "@components/Switch";
import { Button } from "@components/Button";
import { ImageBox } from "@components/ImageBox";
import { Checkbox } from "@components/Checkbox";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

const createListingSchema = yup.object({
  //livro
  title: yup.string().required("Informe o nome."),
  study_area: yup.string().required("Informe a área de estudo."),
  published_at: yup.string().required("Informe a área de estudo."),
  author: yup.string().required("Informe a área de estudo."),
  //anuncio
  name: yup.string().required("Informe o nome."),
  description: yup.string().required("Informe a descrição do produto"),
  is_new: yup.boolean().required(),
  price: yup.number().required("Informe o valor."),
  quantity: yup.number().required("Informe a quantidade."),
});

type NewListingFormProps = yup.InferType<typeof createListingSchema>;

type initialRouteProps = RouteProp<AppRoutes, "createListing">;

export function CreateListing() {
  const [productImages, setProductImages] = useState([] as any[]);
  const toast = useToast();
  const navigation = useNavigation<AppNavigationRouteProps>();
  const router = useRoute<initialRouteProps>();
  const { user } = useAuth();
  const [isLoadingListing, setIsLoadingListing] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewListingFormProps>({
    resolver: yupResolver(createListingSchema),
    defaultValues: {
      is_new: true,
      quantity: 1
    },
  });

  async function fetchListingDataById() {
    const { listingId, mode } = router.params;

    if (mode == "create") {
      return;
    }

    try {
      setIsLoadingListing(true);
      const { data } = await api.get(`/products/${listingId}`);
      const images = data.product_images.map((image: any) => {
        return {
          name: image.path,
          uri: `${api.defaults.baseURL}/images/${image.path}`,
          type: `image/${image.path.split(".")[1]}`,
        };
      });
      const payment_methods = data.payment_methods.map(
        (payment: any) => payment.key
      );

      setProductImages(images);

      reset({
        name: data.name,
        description: data.description,
        is_new: data.is_new,
        price: data.price / 100,
      });
    } catch (error) {
      toast.show({
        title: "Error ao receber dados do anúncio",
        placement: "top",
        bgColor: "error.500",
      });
    } finally {
      setIsLoadingListing(false);
    }
  }

  async function handlePickPhoto(image: any) {
    if (!!image.uri) {
      setProductImages(productImages.filter((img) => img.uri !== image.uri));
      return;
    }

    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        // orderedSelection: true,
        allowsMultipleSelection: false,
      });

      if (photosSelected.canceled) {
        return;
      }

      if (photosSelected.assets.length + productImages.length > 6) {
        return toast.show({
          title: "Selecione no máximo 1 imagem",
          placement: "top",
          bgColor: "error.500",
        });
      }

      //map para pegar o uri de cada imagem selecionada
      if (photosSelected.assets[0].uri) {
        const photosInfo = await Promise.all(
          photosSelected.assets.map(async (photo) => {
            return await FileSystem.getInfoAsync(photo.uri);
          })
        );

        if (
          photosInfo.some(
            (photo) => photo.exists && photo.size / 1024 / 1024 > 5
          )
        ) {
          return toast.show({
            title: "Cada imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "error.500",
          });
        }

        const photos = photosSelected.assets.map((photo) => {
          const fileExtension = photo.uri.split(".").pop();
          return {
            name: `${user.name}.${fileExtension}`.toLowerCase(),
            uri: photo.uri,
            type: `${photo.type}/${fileExtension}`,
          };
        });
        setProductImages((prevImages) => prevImages.concat(photos));
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const ErrorMessage = isAppError
        ? error.message
        : "Não foi possível fazer o anúncio.\nTente novamente.";

      toast.show({
        title: ErrorMessage,
        bgColor: "error.500",
        placement: "top",
      });
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  async function onSubmit(form: NewListingFormProps) {
    if (productImages.length === 0) {
      return toast.show({
        title: "Selecione ao menos uma imagem",
        placement: "top",
        bgColor: "error.500",
      });
    }

    navigation.navigate("previewListing", {
      mode: router.params.mode,
      listingId: router.params.listingId,
      seller: user,
      // product: form as ListingDTO,
      product: form as any,
      productImages: productImages,
    });
  }

  useEffect(() => {
    fetchListingDataById();
  }, []);

  if (isLoadingListing) {
    return <Loading />;
  }

  return (
    <VStack flex={1} safeAreaTop bg="gray.200">
      <Box px="6">
        <Header title="Criar anúncio" backButton />
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        px="6"
        keyboardDismissMode="on-drag"
      >
        <VStack mt="6">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Criar anúncio
          </Heading>
          <Text color="gray.500">Escolha a melhor imagem do seu livro!</Text>
          <HStack mt="4" space="2">
            <FlatList
              horizontal
              data={productImages}
              renderItem={({ item, index }) => (
                <ImageBox
                  onPress={() => handlePickPhoto(item)}
                  image={item}
                  key={item.uri}
                  ml={index === 0 ? 0 : 2}
                />
              )}
              ListFooterComponent={
                productImages.length > 0 && productImages.length < 6 ? (
                  <ImageBox onPress={handlePickPhoto} ml={2} />
                ) : null
              }
              ListEmptyComponent={() => <ImageBox onPress={handlePickPhoto} />}
              showsHorizontalScrollIndicator={false}
            />
          </HStack>
        </VStack>
        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Detalhes do anúncio
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do anúncio"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <MultilineInput
                placeholder="Título do anúncio"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description?.message}
              />
            )}
          />

          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Detalhes do produto
          </Heading>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Titulo do livro"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="author"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Autor do livro"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="study_area"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Área de estudo"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="published_at"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Ano de publicação"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="is_new"
            render={({ field: { onChange, value } }) => (
              <Radio.Group
                name="is_new"
                accessibilityLabel="favorite number"
                value={value.toString()}
                onChange={onChange}
              >
                <HStack space="5">
                  <Radio colorScheme="blue" value="true" my={1}>
                    Novo
                  </Radio>
                  <Radio colorScheme="blue" value="false" my={1}>
                    Usado
                  </Radio>
                </HStack>
              </Radio.Group>
            )}
          />
        </VStack>

        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Venda
          </Heading>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                variant="cash"
                placeholder="Valor do produto"
                onChangeText={onChange}
                value={value?.toString()}
                mt="4"
                mb="4"
                errorMessage={errors.price?.message}
              />
            )}
          />
           <Heading fontFamily="heading" fontSize="md" color="gray.600">
           Quantidade
          </Heading>
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Quantidade do produto"
                onChangeText={onChange}
                value={value?.toString()}
                mt="4"
                mb="4"
                errorMessage={errors.quantity?.message}
              />
            )}
          />
        </VStack>
        <Box h="10" />
      </ScrollView>
      <HStack
        w="full"
        bg="white"
        justifyContent="space-between"
        alignItems={"center"}
        paddingTop={5}
        paddingBottom={Platform.OS === "ios" ? 7 : 5}
        paddingX={6}
      >
        <HStack justifyContent="space-between" space="3">
          <Button
            flex="1"
            title={"Cancelar"}
            type="tertiary"
            onPress={handleCancel}
          />
          <Button flex="1" title={"Avançar"} onPress={handleSubmit(onSubmit)} />
        </HStack>
      </HStack>
    </VStack>
  );
}
