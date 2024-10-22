import {
  VStack,
  Center,
  Text,
  Image,
  Heading,
  ScrollView,
  Pressable,
  useToast,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { AuthNavigationRouteProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";

import Logo from "@assets/Img/Logo/Logo.png";
import { useState } from "react";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
};

type AvatarData = {
  name: string;
  uri: string;
  type: string;
};

const signUpSchema = yup.object({
  username: yup.string().required("Informe um nome."),
  email: yup
    .string()
    .email("Informe um e-mail válido.")
    .required("Informe um e-mail válido."),
  phone: yup.string().required("Informe um número de telefone."),
  password: yup
    .string()
    .min(6, "Senha deve possuir no mínimo 6 caracteres")
    .required("Informe a senha."),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas não coincidem")
    .required("Informe a confirmação da senha."),
});

export function SignUp() {
  const { t } = useTranslation();
  const { SignIn } = useAuth();
  const navigation = useNavigation<AuthNavigationRouteProps>();
  const toast = useToast();
  const [avatar, setAvatar] = useState<AvatarData>({} as AvatarData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleSelectAvatar() {
    const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (selectedPhoto.canceled) {
      return;
    }
    if (selectedPhoto.assets.length > 0) {
      const photoInfo = await FileSystem.getInfoAsync(
        selectedPhoto.assets[0].uri
      );
      if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
        return toast.show({
          title: "Cada imagem deve ter no máximo 5MB",
          placement: "top",
          bgColor: "error.500",
        });
      }
    }

    const fileExtension = selectedPhoto.assets[0].uri
      .split(".")
      .pop() as string;

    setAvatar({
      name: `.${fileExtension}`,
      uri: selectedPhoto.assets[0].uri,
      type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
    });
  }

  async function handleSignUp(form: FormData) {
    if (!avatar.uri) {
      return toast.show({
        title: "Selecione uma imagem",
        placement: "top",
        bgColor: "error.500",
      });
    }

    const formData = new FormData();

    avatar.name = `${form.username}${avatar.name}`.toLocaleLowerCase();
    formData.append("avatar", avatar as any);
    formData.append("name", form.username);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);

    try {
      // await api.post("/auths/register/", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      await api.post("/auths/register/", {...form, photo: "", address: null, last_name: ""});

      await SignIn(form.email, form.password);
    } catch (error: any) {
      const isAppError = error instanceof AppError;
      const ErrorMessage = isAppError
        ? error.message
        : "Não foi possível criar a conta.\n Tente novamente mais tarde";

      toast.show({
        title: ErrorMessage,
        placement: "top",
        bgColor: "red.500",
      });
    }
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
          <Pressable onPress={handleSelectAvatar} _pressed={{ opacity: 0.7 }}>
            <Avatar
              source={avatar.uri ? avatar : undefined}
              my="4"
              badge
              size="22"
            />
          </Pressable>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                mb="4"
                placeholder={t("Common:Name")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mb="4"
                placeholder={t("Common:E-mail")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                mb="4"
                placeholder={t("Common:Mobile-number")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                mb="4"
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
                mb="4"
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
