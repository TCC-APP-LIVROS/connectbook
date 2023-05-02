import { VStack, Center, Text, Image, Heading, Container } from "native-base";
import { Input } from "@components/Input";

import Logo from "@assets/Img/Logo/Logo.png";
import { Button } from "@components/Button";
import { ArrowArcLeft } from "phosphor-react-native";
export function SignIn() {
  return (
    <VStack flex={1}>
      <VStack px={10} borderBottomRadius={"12"} bg={"gray.200"}>
        <Center w="full" mt="16">
          <Image source={Logo} alt="Logo" mb="5" mt={10} />
          <Heading color="gray.700" fontSize="3.5xl" fontFamily="heading">
            marketspace
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Seu espaço de compra e venda
          </Text>
        </Center>

        <Center>
          <Text mb="4" mt="20" fontSize="sm">
            Acesse a sua conta
          </Text>
          <Input placeholder="E-mail" />
          <Input placeholder="E-mail" variant="password" />
          <Button w="full" type="secondary" mt="4" title="Entrar" mb="16" />
        </Center>
      </VStack>

      <VStack flex={1} px={10} justifyContent={"center"} bg="gray.100">
        <Center>
          <Text color="gray.500" fontSize="sm">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar uma conta"
            type="tertiary"
            w="full"
            mt="4"
            mb={10}
          />
        </Center>
      </VStack>
    </VStack>
  );
}
