import {
  HStack,
  VStack,
  Text,
  Box,
  Icon,
  useTheme,
  FlatList,
  Actionsheet,
  useDisclose,
  Heading,
  Checkbox,
  Container,
  Pressable,
} from "native-base";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";
import { ArrowRight, Plus, Tag, X } from "phosphor-react-native";

import DefaultImage from "@assets/Img/Image.png";
import { Toggle } from "@components/Toggle";
import { Switch } from "@components/Switch";
import { useState } from "react";

export function Home() {
  const { colors } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [groupValues, setGroupValues] = useState([
    "Boleto",
    "Pix",
    "Dinheiro",
    "Cartão de Crédito",
    "Depósito Bancário",
  ]);
  return (
    <VStack flex={1} px={6} bg="gray.200">
      <HStack mt="16">
        <Avatar size="11.25" />
        <VStack flex={1} ml="2.5">
          <Text>Boas vindas,</Text>
          <Text fontFamily="heading">João</Text>
        </VStack>
        <Button
          startIcon={<Icon as={<Plus color="#fff" size="16" />} />}
          title={"Criar anúncio"}
        />
      </HStack>

      <VStack mt="8">
        <Text color="gray.500">Seus produtos anunciados para venda </Text>
        <HStack
          alignItems="center"
          h="16"
          mt="4"
          py="3"
          px="5"
          borderRadius="sm"
          bg="#DFE1EA"
        >
          <Box>
            <Tag color={colors.blue[800]} />
          </Box>
          <VStack ml="4" flex={1}>
            <Text color="gray.600" fontFamily="heading">
              4
            </Text>
            <Text color="gray.600">Anúncios ativos</Text>
          </VStack>
          <HStack alignItems="center">
            <Text color="blue.800" fontFamily="heading" mr="2">
              Meus anúncios
            </Text>
            <Icon as={<ArrowRight color={colors.blue[800]} size="16" />} />
          </HStack>
        </HStack>
      </VStack>

      <VStack mt="4" flex={1}>
        <Text mb="4" color="gray.500">
          Compre produtos variados
        </Text>
        <Input
          placeholder="Pesquisar"
          variant="search"
          onFilterPress={onOpen}
        />
        {/* da pra melhorar o espaçamento e estilo */}
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          keyExtractor={(item) => String(item)}
          numColumns={2}
          _contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <ProductCard
              mx={2}
              image={DefaultImage}
              avatarImage={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
              }}
              title="Tênis Nike"
            />
          )}
        />
      </VStack>
      <VStack>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content bgColor="gray.200">
            <HStack w="100%" h={60} px={4} justifyContent="space-between" alignItems="center">
              <Heading fontSize="xl" color="gray.700" fontFamily="heading">
                Filtrar anúncios
              </Heading>
              <Pressable onPress={onClose}>
                <X size={24} color={colors.gray[400]} />
              </Pressable>
            </HStack>
            <Box w="100%" px="4" mt="6">
              <Heading fontSize="sm" color="gray.600" fontFamily="heading">
                Condição
              </Heading>
              <HStack mt="3">
                <Toggle title="Novo" value={true} />
                <Toggle title="Usado" value={false} ml="2" />
              </HStack>
            </Box>
            <Box w="100%" px="4" mt="6">
              <Heading fontSize="sm" color="gray.600" fontFamily="heading">
                Aceita troca?
              </Heading>
              <Switch mt="3" />
            </Box>
            <Box w="100%" px="4" mt="6">
              <Heading fontSize="sm" color="gray.600" fontFamily="heading">
                Meios de Pagamento
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
            </Box>

            <Box w="100%" px="4" mt="6">
              <HStack justifyContent="space-between" space="3">
                <Button flex="1" title={"Resetar filtros"} type="tertiary" />
                <Button flex="1" title={"Aplicar filtros"} />
              </HStack>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </VStack>
  );
}
