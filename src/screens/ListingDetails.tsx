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
  return (
    <VStack flex={1} safeAreaX safeAreaTop>
      <Box px="6">
        <Header
          backButton
          title="Listing Details"
          rightButtonIcon={<Pencil size={24} />}
        />
      </Box>
      <Carrousel mt={3} />

      <ScrollView
        flex="1"
        px="6"
        mt={2}
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

        <HStack mt={5} alignItems="flex-end" justifyContent="space-between">
          <Heading fontSize="xl" fontFamily="heading" color="gray.700">
            Bicicleta
          </Heading>

          <Heading
            fontSize="sm"
            fontFamily="heading"
            color="blue.600"
            lineHeight="xl"
          >
            R${" "}
            <Heading fontSize="xl" fontFamily="heading" color="blue.600">
              120,00
            </Heading>
          </Heading>
        </HStack>

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
    </VStack>
  );
}
