import { VStack, Center, Text, Image, Heading, useToast } from "native-base";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import Logo from "@assets/Img/Logo/Logo.png";
import { AuthNavigationRouteProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail."),
  password: yup.string().required("Informe a senha."),
});

export function SignIn() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<AuthNavigationRouteProps>();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { SignIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsSubmitting(true);
      
      await SignIn(email, password);
    
    } catch (error) {
    
      const isAppError = error instanceof AppError;
      const ErrorMessage = isAppError
        ? error.message
        : "Não foi possível fazer o login.\nTente novamente.";
    
        toast.show({
        title: ErrorMessage,
        bgColor: "error.500",
        placement: "top",
    
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoToSignUp() {
    navigation.navigate("SignUp");
  }
  return (
    <VStack flex={1} safeAreaTop bg={"gray.200"}>
      <VStack px={12} borderBottomRadius={"12"}>
        <Center w="full" mt={"20"}>
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder={t("Common:E-mail")}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder={t("Common:Password")}
                variant="password"
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            w="full"
            type="secondary"
            mt="4"
            title={t("SignIn:SignIn")}
            mb="16"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isSubmitting}
          />
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
