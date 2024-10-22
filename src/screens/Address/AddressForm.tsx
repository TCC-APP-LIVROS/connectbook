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
  receiver_name: yup.string().required("Informe o nome."),
  cep: yup.string().required("Informe o CEP."),
  street: yup.string().required("Informe a rua."),
  neighborhood: yup.string().required("Informe o bairro."),
  city: yup.string().required("Informe a cidade."),
  state: yup.string().required("Informe o estado."),
  number: yup.string().required("Informe o número."),
  complement: yup.string(),
  nickname: yup.string().required("Informe como deseja chamar esse endereço.")
});

type NewListingFormProps = yup.InferType<typeof createListingSchema>;

type initialRouteProps = RouteProp<AppRoutes, "editAddress">;

export function AddressForm() {
  const [productImages, setProductImages] = useState([] as any[]);
  const toast = useToast();
  const navigation = useNavigation<AppNavigationRouteProps>();
  const router = useRoute<initialRouteProps>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewListingFormProps>({
    resolver: yupResolver(createListingSchema)
  });

  function handleCancel() {
    navigation.goBack();
  }

  async function onSubmit(form: NewListingFormProps) {
    if(router.params.mode === "edit") {
      editAddress(form);
    }
    if(router.params.mode === "create") {
      createAddress(form);
    }
  }

  async function editAddress(form: NewListingFormProps) {
    try {
      setIsLoading(true);
      await api.put(`/auths/user_address_update/${router.params.address?.id}/`, form);

      toast.show({
        title: "Endereço atuallizado com sucesso",
        placement: "top",
        bgColor: "success.500",
      });

      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar o endereço, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  async function createAddress(form: NewListingFormProps) {
    try {
      setIsLoading(true);
      await api.post("/auths/user_address_register/", {
        address: form,
        user_id: user.id,
      });

      toast.show({
        title: "Endereço criado com sucesso",
        placement: "top",
        bgColor: "success.500",
      });

      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar o endereço, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "error.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (router.params.mode === "edit" && router.params.address) {
      reset(router.params.address);
    }
  }, [router.params.mode, router.params.address, reset]);

  return (
    <VStack flex={1} safeAreaTop bg="gray.200">
      <Box px="6">
        <Header title="Editar endereço" backButton />
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        px="6"
        keyboardDismissMode="on-drag"
      >
        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Endereço
          </Heading>
          <Controller
            control={control}
            name="receiver_name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome completo"
                onChangeText={onChange}
                value={value?.toString()}
                mt="4"
                mb="4"
                errorMessage={errors.receiver_name?.message}
              />
            )}
          />
           <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="CEP"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.cep?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="street"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Rua"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.street?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="neighborhood"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Bairro"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.neighborhood?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Estado"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.state?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Cidade"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Numero"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.number?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="complement"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Complemento"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.complement?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="nickname"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone para contato"
                onChangeText={onChange}
                value={value}
                mt="4"
                mb="4"
                errorMessage={errors.nickname?.message}
              />
            )}
          />
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
