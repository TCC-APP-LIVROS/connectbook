import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { MultilineInput } from "@components/MultilineInput";
import { Switch } from "@components/Switch";
import {
  Box,
  Checkbox,
  HStack,
  Heading,
  Radio,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";
import { Button } from "@components/Button";
import { Platform } from "react-native";
export function CreateListing() {
  const [value, setValue] = useState("one");
  const [groupValues, setGroupValues] = useState<string[]>();
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
            <Box
              bg="gray.300"
              w="24"
              h="24"
              borderRadius="md"
              justifyContent="center"
              alignItems="center"
            >
              <Plus size={24} />
            </Box>
            <Box
              bg="gray.300"
              w="24"
              h="24"
              borderRadius="md"
              justifyContent="center"
              alignItems="center"
            >
              <Plus size={24} />
            </Box>
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
          <Switch mt="3"  justifyContent="center" alignItems={"center"}/>
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
