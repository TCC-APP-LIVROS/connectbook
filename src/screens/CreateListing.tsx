import { useState } from "react";
import { Platform } from "react-native";
import {
  Box,
  Checkbox,
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

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { MultilineInput } from "@components/MultilineInput";
import { Switch } from "@components/Switch";
import { Button } from "@components/Button";
import { ImageBox } from "@components/ImageBox";

export function CreateListing() {
  const [value, setValue] = useState("one");
  const [groupValues, setGroupValues] = useState<string[]>();
  const [productImages, setProductImages] = useState([] as any[]);
  const toast = useToast();

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
          return {
            uri: photo.uri,
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
            {productImages.map((image) => (
              <ImageBox
                onPress={() => handlePickPhoto(image)}
                image={image}
                key={image.uri}
              />
            ))}
            {productImages.length < 3 && <ImageBox onPress={handlePickPhoto} />}
          </HStack>
        </VStack>
        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Sobre o produto
          </Heading>
          <Input mt="4" placeholder="Título do anúncio" />
          <MultilineInput placeholder="Descrição do produto" />
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <HStack space="5">
              <Radio colorScheme="blue" value="one" my={1}>
                Novo
              </Radio>
              <Radio colorScheme="blue" value="two" my={1}>
                Usado
              </Radio>
            </HStack>
          </Radio.Group>
        </VStack>

        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Venda
          </Heading>
          <Input mt="4" variant="cash" placeholder="Valor do produto" />
        </VStack>

        <VStack mt="8" alignItems="flex-start">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Aceita troca?
          </Heading>
          <Switch mt="3" justifyContent="center" alignItems={"center"} />
        </VStack>

        <VStack mt="8">
          <Heading fontFamily="heading" fontSize="md" color="gray.600">
            Meios de pagamento aceitos
          </Heading>
          <Checkbox.Group
            onChange={setGroupValues}
            value={groupValues}
            accessibilityLabel="choose numbers"
            mt="3"
          >
            <Checkbox value="Boleto" my="1" colorScheme="blue">
              Boleto
            </Checkbox>
            <Checkbox value="Pix" my="1" colorScheme="blue">
              Pix
            </Checkbox>
            <Checkbox value="Dinheiro" my="1" colorScheme="blue">
              Dinheiro
            </Checkbox>
            <Checkbox value="Cartão de Crédito" my="1" colorScheme="blue">
              Cartão de credito
            </Checkbox>
            <Checkbox value="Depósito Bancário" my="1" colorScheme="blue">
              Depósito Bancário
            </Checkbox>
          </Checkbox.Group>
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
          <Button flex="1" title={"Avançar"} />
        </HStack>
      </HStack>
    </VStack>
  );
}
