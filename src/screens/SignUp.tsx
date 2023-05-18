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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AuthNavigationRouteProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import Logo from "@assets/Img/Logo/Logo.png";

type FormData = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirmation: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe um nome."),
  email: yup.string().required("Informe um e-mail válido."),
  tel: yup.string(),
  password: yup.string().min(6, "Senha deve possuir no mínimo 6 caracteres").required("Informe a senha."),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas não coincidem")
    .required("Informe a confirmação da senha."),
});

export function SignUp() {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthNavigationRouteProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp(form: FormData) {
    console.log(form);
    //navigation.navigate("");
  }
  function handleGoToSignIn() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} px={12} borderBottomRadius={"12"} bg={"gray.200"}>
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t("Common:Name")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t("Common:E-mail")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t("Common:Mobile-number")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.tel?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t("Common:Password")}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={t("Common:Confirm-password")}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password_confirmation?.message}
              />
            )}
          />

          <Button
            w="full"
            mt="6"
            title={t("SignUp:SignUp")}
            onPress={handleSubmit(handleSignUp)}
          />
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
