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
  FormControl,
} from "native-base";

import {
  Eye,
  EyeClosed,
  MagnifyingGlass,
  Sliders,
} from "phosphor-react-native";
import { applyPriceMask } from "@utils/masks";

type InputVariant = "default" | "password" | "search" | "cash";

type InputProps = IInputProps & {
  variant?: InputVariant;
  onFilterPress?: () => void;
  onSearchPress?: () => void;
  errorMessage?: string | null;
};

export function Input({
  errorMessage = null,
  isInvalid,
  variant = "default",
  onChangeText,
  onFilterPress,
  onSearchPress,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();
  const invalid = !!errorMessage || isInvalid;

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
          <MagnifyingGlass weight="bold" size={24} color={colors.gray[500]} />
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

  function handleOnChangeText(text : string, onChange : any){
    if(variant === "cash"){
      const cleanedText = applyPriceMask(text);
      onChange(cleanedText);
    }else{
      onChange(text);
    }
  }
  return (
    <FormControl isInvalid={invalid} mb="4">
      <NativeBaseInput
        h="12"
        px="4"
        py="3"
        secureTextEntry={variant === "password" && !showPassword}
        keyboardType={variant === "cash" ? "numeric" : "default"}
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
        onChangeText={(text) => handleOnChangeText(text, onChangeText)}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
