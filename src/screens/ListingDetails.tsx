import { Header } from "@components/Header";
import { Carrousel } from "@components/Carrousel";
import { Box, HStack, VStack, Text, Heading, useTheme, ScrollView } from "native-base";
import { Barcode, CreditCard, Money, Pencil, QrCode, Bank, WhatsappLogo } from "phosphor-react-native";
import { Avatar } from "@components/Avatar";
import { Toggle } from "@components/Toggle";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";

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

      <ScrollView px="6" mt={5} flex="1">
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

        <HStack alignItems="center">
            <Box opacity="0.8">
            <Barcode size={18} color={colors.gray[700]} />
            </Box>
            <Text ml="2" fontSize="sm" color={"gray.600"}>
                Boleto
            </Text>
            </HStack>
        <HStack alignItems="center">
            <Box opacity="0.8">
            <QrCode size={18} color={colors.gray[700]} />
            </Box>
            <Text ml="2" fontSize="sm" color={"gray.600"}>
                Pix
            </Text>
            </HStack>
        <HStack alignItems="center">
            <Box opacity="0.8">
            <Money size={18} color={colors.gray[700]} />
            </Box>
            <Text ml="2" fontSize="sm" color={"gray.600"}>
                Dinheiro
            </Text>
            </HStack>
        <HStack alignItems="center">
            <Box opacity="0.8">
            <CreditCard size={18} color={colors.gray[700]} />
            </Box>
            <Text ml="2" fontSize="sm" color={"gray.600"}>
                Cartão
            </Text>
            </HStack>
        <HStack alignItems="center">
            <Box opacity="0.8">
            <Bank size={18} color={colors.gray[700]} />
            </Box>
            <Text ml="2" fontSize="sm" color={"gray.600"}>
                Depósito Bancário
            </Text>
            </HStack>

      
      </ScrollView>
      <HStack
      w="full"
      bg="white"
      justifyContent="space-between"
      alignItems={"center"}
      paddingY={6}
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
          startIcon={<WhatsappLogo size={24} weight="fill" color={colors.white} />}
          title="Entrar em contato"
          />
      </HStack>

    </VStack>
  );
}
