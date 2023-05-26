import { useState } from "react";
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

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { MultilineInput } from "@components/MultilineInput";
import { Switch } from "@components/Switch";
import { Button } from "@components/Button";
import { ImageBox } from "@components/ImageBox";
import { Checkbox } from "@components/Checkbox";

const createListingSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  description: yup.string(),
  is_new: yup.string().default("true"),
  price: yup.number().required("Informe o valor."),
  accept_trade: yup.boolean().default(false).required(),
  payment_methods: yup
    .array(yup.string().defined())
    .min(1, "Preencha ao menos um método de pagamento")
    .required(),
});

type NewListingFormProps = yup.InferType<typeof createListingSchema>;

export function CreateListing() {
  const [productImages, setProductImages] = useState([] as any[]);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewListingFormProps>({
    resolver: yupResolver(createListingSchema),
    defaultValues: {
      is_new: "true",
      accept_trade: false,
    },
  });

  async function handlePickPhoto(image: any) {
    if (!!image.uri) {
      setProductImages(productImages.filter((img) => img.uri !== image.uri));
      return;
    }

    // setPhotoIsLoading(true);
    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        orderedSelection: true,
        allowsMultipleSelection: true,
      });

      if (photosSelected.canceled) {
        return;
      }

      if (photosSelected.assets.length + productImages.length > 6) {
        return toast.show({
          title: "Selecione no máximo 6 imagens",
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

        // const fileExtension = photosSelected.assets[0].uri.split(".").pop();

        const photos = photosSelected.assets.map((photo) => {
          const fileExtension = photo.uri.split(".").pop();
          return {
            name: `${user.name}.${fileExtension}`.toLowerCase(),
            uri: photo.uri,
            type: `${photo.type}/${fileExtension}`,
          };
        });
        setProductImages((prevImages) => prevImages.concat(photos));
        // const photoFile = {
        //   name: `${user.name}.${fileExtension}`.toLowerCase(),
        //   uri: photoSelected.assets[0].uri,
        //   type: `${photoSelected.assets[0].type}/${fileExtension}`,
        // } as any;

        //const userPhotoUploadForm = new FormData();
        // userPhotoUploadForm.append("avatar", photoFile);

        // const userUpdated = user;
        // userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        toast.show({
          title: "Foto atualizada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setPhotoIsLoading(false);
    }
  }

  async function onSubmit(data: NewListingFormProps) {
    console.log(data);
  }

  return (
    <VStack flex={1} safeAreaTop bg="gray.200">
      <Box px="6">
        <Header title="Criar anúncio" backButton />
      </Box>
      <ScrollView showsVerticalScrollIndicator={false} px="6">
        <VStack mt="6">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Criar anúncio
          </Heading>
          <Text color="gray.500">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
          <HStack mt="4" space="2">
            {/* create a horizontal scroll to manage more images */}
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
            Sobre o produto
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
                value={value}
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
              />
            )}
          />
        </VStack>

        <VStack mt="8" alignItems="flex-start">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Aceita troca?
          </Heading>
          <Controller
            control={control}
            name="accept_trade"
            render={({ field: { onChange, value } }) => (
              <Switch
                justifyContent="center"
                alignItems={"center"}
                mt="3"
                onToggle={() => onChange(!value)}
                value={value}
              />
            )}
          />
        </VStack>

        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Meios de pagamento aceitos
          </Heading>
          <Controller
            name="payment_methods"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                options={[
                  "pix",
                  "cartão de crédito",
                  "cartão de débito",
                  "dinheiro",
                ]}
                value={value}
                onChange={onChange}
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
          <Button flex="1" title={"Cancelar"} type="tertiary" />
          <Button flex="1" title={"Avançar"} onPress={handleSubmit(onSubmit)} />
        </HStack>
      </HStack>
    </VStack>
  );
}
