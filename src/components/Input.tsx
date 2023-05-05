import { useState } from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  Text,
  useTheme,
  Pressable,
  Box,
  Divider,
  Center,
} from "native-base";

import {
  Eye,
  EyeClosed,
  MagnifyingGlass,
  Sliders,
} from "phosphor-react-native";

type InputVariant = "default" | "password" | "search" | "cash";

type InputProps = IInputProps & {
  variant?: InputVariant;
  onFilterPress?: () => void;
  onSearchPress?: () => void;
};

export function Input({ variant = "default", onFilterPress, onSearchPress, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();

  function renderPasswordVariant() {
    return (
      <Pressable mr="4" onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <Eye size={24} color={colors.gray[500]} />
        ) : (
          <EyeClosed size={24} color={colors.gray[500]} />
        )}
      </Pressable>
    );
  }

  function renderSearchVariant() {
    return (
      <Center flexDirection="row" height="full">
        <Pressable onPress={onSearchPress} _pressed={{ opacity: "0.5" }}>
        <MagnifyingGlass weight="bold"  size={24} color={colors.gray[500]} />
        </Pressable>
        <Box py="3">
          <Divider orientation="vertical" mx="3" my="1.5" thickness="2" />
        </Box>
        <Pressable mr="4" onPress={onFilterPress} _pressed={{ opacity: "0.5" }}>
          <Sliders weight="bold" size={24} color={colors.gray[500]} />
        </Pressable>
      </Center>
    );
  }

  return (
    <NativeBaseInput
      h="12"
      px="4"
      py="3"
      mb="4"
      secureTextEntry={variant === "password" && !showPassword}
      rounded="sm"
      borderWidth="0"
      fontFamily={"body"}
      fontSize="md"
      bgColor="white"
      placeholderTextColor={"gray.400"}
      color={"gray.600"}
      _focus={{
        borderWidth: "1",
        borderColor: "gray.500",
      }}
      InputLeftElement={
        variant === "cash" ? (
          <Text ml="4" mr="-2" color="gray.700">
            R$
          </Text>
        ) : undefined
      }
      InputRightElement={
        (variant === "password" && renderPasswordVariant()) ||
        (variant === "search" && renderSearchVariant()) ||
        undefined
      }
      {...rest}
    />
  );
}
