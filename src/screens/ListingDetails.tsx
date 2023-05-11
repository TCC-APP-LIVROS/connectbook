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
} from "native-base";
import {
  Pencil,
  Power,
  TrashSimple,
  WhatsappLogo,
} from "phosphor-react-native";
import { Avatar } from "@components/Avatar";
import { Toggle } from "@components/Toggle";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";
import { PaymentMethod } from "@components/PaymentMethod";
import { Platform } from "react-native";

export function ListingDetails() {
  const { colors } = useTheme();
  const route = {
    listingType: "user", // user or dealer
    isListingActive: false, // active or inactive
  };
  return (
    <VStack flex={1} safeAreaX safeAreaTop>
      <Box px="6">
        <Header
          backButton
          rightButtonIcon={
            route.listingType === "user" ? <Pencil size={24} /> : undefined
          }
        />
      </Box>
      <VStack>
        <Carrousel />
        {route.isListingActive ? null : (
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
                Anúncio desativado
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
          <Avatar size={6} />
          <Text fontSize="sm" color="gray.700" ml="2">
            Dealer Name
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
            Bicicleta Muito ultra mega blaster ultra
          </Heading>

          <Heading
            fontSize="sm"
            fontFamily="heading"
            color="blue.600"
            lineHeight="xl"
          >
            R${" "}
            <Heading fontSize="xl" fontFamily="heading" color="blue.600">
              100,00
            </Heading>
          </Heading>
        </VStack>

        <Text fontSize="sm" color={"gray.600"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          iusto obcaecati velit consequatur minima recusandae atque facilis
          itaque autem quo cum modi esse ullam, soluta corrupti. Asperiores
          inventore distinctio dolore.
        </Text>

        <Heading mt={6} fontFamily="heading" fontSize="sm" color={"gray.600"}>
          Aceita troca?{"  "}
          <Text fontFamily="body" color={"gray.600"}>
            Sim
          </Text>
        </Heading>

        <Heading mt={6} fontFamily="heading" fontSize="sm" color={"gray.600"}>
          Meios de pagamento
        </Heading>

        <PaymentMethod payment="Boleto" color={colors.gray[700]} />
        <PaymentMethod payment="Pix" color={colors.gray[700]} />
        <PaymentMethod payment="Dinheiro" color={colors.gray[700]} />
        <PaymentMethod payment="Cartão" color={colors.gray[700]} />
        <PaymentMethod payment="Depósito Bancário" color={colors.gray[700]} />
        {route.listingType === "user" && (
          <>
            {route.isListingActive ? (
              <Button
                title="Desativar anúncio"
                mt="8"
                startIcon={<Power size={16} color={colors.gray[100]} />}
              />
            ) : (
              <Button
                title="Reativar anúncio"
                type="secondary"
                mt="8"
                startIcon={<Power size={16} color={colors.gray[100]} />}
              />
            )}
            <Button
              title="Excluir anúncio"
              type="tertiary"
              mt="2"
              startIcon={<TrashSimple size={16} color={colors.gray[400]} />}
            />
          </>
        )}
        <Box h="10" />
      </ScrollView>
      {route.listingType === "dealer" && (
        <HStack
          w="full"
          bg="white"
          justifyContent="space-between"
          alignItems={"center"}
          paddingTop={5}
          paddingBottom={Platform.OS === "ios" ? 7 : 5}
          paddingX={6}
        >
          <Heading
            fontSize="sm"
            fontFamily="heading"
            color="blue.800"
            lineHeight="xl"
          >
            R${" "}
            <Heading fontSize="xl" fontFamily="heading" color="blue.800">
              120,00
            </Heading>
          </Heading>
          <Button
            type="secondary"
            startIcon={
              <WhatsappLogo size={24} weight="fill" color={colors.white} />
            }
            title="Entrar em contato"
          />
        </HStack>
      )}
    </VStack>
  );
}
