import {
  VStack,
  Center,
  Text,
  Image,
  Heading,
  Container,
  ScrollView,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { AuthNavigationRouteProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import Logo from "@assets/Img/Logo/Logo.png";


export function SignUp() {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthNavigationRouteProps>();

  function handleGoToSignIn() {
    navigation.goBack();
  }
  return (
    <VStack flex={1} px={12 } borderBottomRadius={"12"} bg={"gray.200"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w="full" mt={"24"} mb="4">
          <Image source={Logo} alt="Logo" width={16} height={10} mb="5" />
          <Heading color="gray.700" fontSize="xl" fontFamily="heading">
            {t("SignUp:Welcome")}
          </Heading>
          <Text color="gray.500" fontSize="sm" textAlign="center">
            {t("SignUp:Welcome-Message")}
          </Text>
        </Center>

        <Center>
          <Avatar my="4" badge size="22" />
          <Input placeholder={t("Common:Name")} />
          <Input placeholder={t("Common:E-mail")} />
          <Input placeholder={t("Common:Mobile-number")} />
          <Input placeholder={t("Common:Password")} />
          <Input placeholder={t("Common:Confirm-password")} />
          <Button w="full" mt="6" title={t("SignUp:SignUp")} />
        </Center>

        <Center mt="12">
          <Text color="gray.500" fontSize="sm" textAlign="center">
            {t("SignUp:Already-have-an-account")}
          </Text>
          <Button
            type="tertiary"
            w="full"
            mt="4"
            title={t("SignUp:Go-to-login")}
            mb="12"
            onPress={handleGoToSignIn}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
