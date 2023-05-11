import "react-native-gesture-handler"
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
} from "native-base";
import { ArrowLeft, Tag as PriceTag, TagSimple, WhatsappLogo } from "phosphor-react-native";
import { Platform } from "react-native";
export function PreviewListing() {
  const { colors } = useTheme();
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

      <Carrousel />

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

        <VStack mt={5} mb={2} alignItems="flex-start" justifyContent="space-between">
          <Heading fontSize="xl" fontFamily="heading" color="gray.700">
            Bicicleta Muito foda ultra mega blaster ultra
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
          <Button flex="1" title={"Voltar e editar"} type="tertiary" startIcon={<ArrowLeft size={16} color={colors.gray[600]}/>} />
          <Button flex="1" title={"Publicar"} type="secondary" startIcon={<PriceTag size={16} color={colors.gray[200]}/>}/>
        </HStack>
      </HStack>
    </VStack>
  );
}
