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

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ListingDTO } from "@dtos/ListingDTO";
import { allPaymentMethods, PaymentMethod } from "@dtos/PaymentMethodsDTO";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

const createListingSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  description: yup.string().required("Informe a descrição do produto"),
  is_new: yup.boolean().required(),
  price: yup.number().required("Informe o valor."),
  accept_trade: yup.boolean().required(),
  payment_methods: yup
    .array(yup.string().oneOf(allPaymentMethods))
    .min(1, "Preencha ao menos um método de pagamento")
    .required(),
});

type NewListingFormProps = yup.InferType<typeof createListingSchema>;

type initialRouteProps = RouteProp<AppRoutes, "createListing">;

export function EditPayment() {
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
      accept_trade: false,
      payment_methods: allPaymentMethods,
    },
  });


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
      product: form as any,
      productImages: productImages,
    });
  }

  if (isLoadingListing) {
    return <Loading />;
  }

  return (
    <VStack flex={1} safeAreaTop bg="gray.200">
      <Box px="6">
        <Header title="Editar cartão" backButton />
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        px="6"
        keyboardDismissMode="on-drag"
      >
        <VStack mt="8">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome do titular"
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
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Numero do cartão"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <HStack justifyContent={"space-around"}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Validade"
                width={"45%"}
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
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="CCV"
                width={"45%"}
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.name?.message}
              />
            )}
          />
          </HStack>
        </VStack>
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
          <Button flex="1" title={"Salvar"} onPress={handleSubmit(onSubmit)} />
        </HStack>
      </HStack>
    </VStack>
  );
}
