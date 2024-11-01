import "react-native-gesture-handler";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Carrousel } from "@components/Carrousel";
import { PaymentMethod } from "@components/PaymentMethod";
import { Tag } from "@components/Tag";
import {
  Text,
  Center,
  Heading,
  VStack,
  ScrollView,
  HStack,
  Box,
  useTheme,
  useToast,
} from "native-base";
import { ArrowLeft, Tag as PriceTag } from "phosphor-react-native";
import { Platform } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRouteProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

type initialRouteProps = RouteProp<AppRoutes, "previewListing">;

export function PreviewListing() {
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigationRouteProps>();
  const route = useRoute<initialRouteProps>();
  const toast = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode, listingId, product, productImages, seller } = route.params;

  async function handleCreate() {

    try {
      const response = await api.post("ads/announcement/create/total/", {
        ...product,
        condition: product.is_new ? "Novo" : "Usado",
        status: "activated",
        seller_id: user.id,
      });

      const productImagesUploadForm = new FormData();

      // productImagesUploadForm.append("product_id", response.data.id);
      // productImages.forEach((image, index) => {
      //   productImagesUploadForm.append("images", image as any);
      // });

      // await api.post(`/products/images`, productImagesUploadForm, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      navigation.navigate("bottomTabsRoutes", { screen: "myListing" });
      return toast.show({
        title: "Anúncio publicado com sucesso!",
        bgColor: "success.500",
        placement: "top",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const ErrorMessage = isAppError
        ? error.message
        : "Não foi possível Publicar o anúncio.\nTente novamente.";

      toast.show({
        title: ErrorMessage,
        bgColor: "error.500",
        placement: "top",
      });
    }
  }

  async function handleUpdate() {
    try {
      // setIsSubmitting(true);
      //  await api.put(`/products/${listingId}`, {
      //   ...product,
      //   price: product.price * 100,
      // });

      // const productImagesUploadForm = new FormData();

      // productImagesUploadForm.append("product_id", listingId as string);
      // productImages.forEach((image, index) => {
      //   productImagesUploadForm.append('images', image as any);
      // });
      // await api.put(
      //   `/products/images`,
      //   productImagesUploadForm,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      navigation.navigate("bottomTabsRoutes", { screen: "myListing" });
      return toast.show({
        title: "Anúncio publicado com sucesso!",
        bgColor: "success.500",
        placement: "top",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const ErrorMessage = isAppError
        ? error.message
        : "Não foi possível Publicar o anúncio.\nTente novamente.";

      toast.show({
        title: ErrorMessage,
        bgColor: "error.500",
        placement: "top",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePublish() {
    if (mode === "create") {
      handleCreate();
    } else if (mode === "edit") {
      handleUpdate();
    } else {
      return toast.show({
        title: "Não foi possível Publicar o anúncio.\nTente novamente.",
        bgColor: "error.500",
        placement: "top",
      });
    }
  }
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack flex={1} bg="gray.200">
      <Center pt="16" pb="3" px="6" bg="blue.600">
        <Heading fontFamily="heading" fontSize="md" color="gray.100">
          Pré visualização do anúncio
        </Heading>
        <Text fontSize="md" color="gray.100">
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <Carrousel images={productImages} />

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
              uri: `https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg`,
            }}
            size={6}
          />
          <Text fontSize="sm" color="gray.700" ml="2">
            {seller.name}
          </Text>
        </HStack>

        <HStack>
          <Tag mt={5} title="novo" bgColor={"gray.300"} titleColor="gray.600" />
        </HStack>

        <VStack
          mt={5}
          mb={2}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Heading fontSize="xl" fontFamily="heading" color="gray.700">
            {product.name}
          </Heading>

          <Heading
            fontSize="sm"
            fontFamily="heading"
            color="blue.600"
            lineHeight="xl"
          >
            R${" "}
            <Heading fontSize="xl" fontFamily="heading" color="blue.600">
              {Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(product.price)}
            </Heading>
          </Heading>
        </VStack>

        <Heading mt={2} fontFamily="heading" fontSize="md" color={"gray.600"}>
          {product.title}
        </Heading>

        <Heading mt={4} fontFamily="heading" fontSize="sm" color={"gray.600"}>
          Autor:{" "}
          <Text fontFamily="body" color={"gray.600"}>
            {product.author}
          </Text>
        </Heading>
        <Heading mt={2} fontFamily="heading" fontSize="sm" color={"gray.600"}>
          Publicado:{" "}
          <Text fontFamily="body" color={"gray.600"}>
            {product.published_at}
          </Text>
        </Heading>
        <Heading mt={2} fontFamily="heading" fontSize="sm" color={"gray.600"}>
          Área de estudo:{" "}
          <Text fontFamily="body" color={"gray.600"}>
            {product.study_area}
          </Text>
        </Heading>

        <Box h="4" />
        <Text fontFamily="body" color={"gray.600"}>
          {product.description}
        </Text>

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
            title={"Voltar e editar"}
            type="tertiary"
            startIcon={<ArrowLeft size={16} color={colors.gray[600]} />}
            onPress={handleGoBack}
          />
          <Button
            flex="1"
            title={"Publicar"}
            type="secondary"
            startIcon={<PriceTag size={16} color={colors.gray[200]} />}
            onPress={handlePublish}
            isLoading={isSubmitting}
          />
        </HStack>
      </HStack>
    </VStack>
  );
}
