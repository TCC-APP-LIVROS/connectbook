import { VStack, Center, Text, Image, Heading } from "native-base";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import Logo from "@assets/Img/Logo/Logo.png";
import { AuthNavigationRouteProps } from "@routes/auth.routes";

export function SignIn() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<AuthNavigationRouteProps>();
  
  async function handleSignIn() {
      //navigation.navigate("");
  }
  
  function handleGoToSignUp() {
      navigation.navigate("SignUp");
  }
  return (
    // adicionar em uma scroll view para devices menores?

    <VStack flex={1} safeAreaTop bg={"gray.200"}>
      <VStack px={12} borderBottomRadius={"12"} >
        <Center w="full"  mt={"20"}>
          <Image source={Logo} alt="Logo" mb="5" />
          <Heading color="gray.700" fontSize="3.5xl" fontFamily="heading">
            marketspace
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {t("SignIn:Slogan")}
          </Text>
        </Center>

        <Center>
          <Text mb="4" mt="20" fontSize="sm">
            {t("SignIn:login-to-your-account")}
          </Text>
          <Input placeholder={t("Common:E-mail")} />
          <Input placeholder={t("Common:Password")} variant="password" />
          <Button w="full" type="secondary" mt="4" title={t("SignIn:SignIn")} mb="16" />
        </Center>
      </VStack>

      <VStack flex={1} px={10} justifyContent={"center"} bg="gray.100">
        <Center>
          <Text color="gray.500" fontSize="sm">
            {t("SignIn:Dont-have-an-account")}
          </Text>
          <Button
            title={t("SignIn:Create-account")}
            type="tertiary"
            w="full"
            mt="4"
            mb={10}
            onPress={handleGoToSignUp}
          />
        </Center>
      </VStack>
    </VStack>
  );
}
