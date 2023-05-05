import { DefaultTFuncReturn } from "i18next";
import {
  Button as NativeBaseButton,
  IButtonProps,
  Heading,
} from "native-base";

type ButtonType = "primary" | "secondary" | "tertiary";

type ButtonProps = IButtonProps & {
  type?: ButtonType;
  title?: DefaultTFuncReturn;
};

export function Button({ title, type = "primary", ...rest }: ButtonProps) {
  const color = {
    primary: "gray.700",
    secondary: "blue.600",
    tertiary: "gray.300",
  };
  
  return (
    <NativeBaseButton
      h="10.5"
      rounded="sm"
      bg={color[type]}
      _pressed={{ bg: color[type] , opacity: "0.5" }}
      {...rest}
    >
      <Heading
        fontSize="sm"
        fontFamily="heading"
        color={type === "tertiary" ? "gray.600" : "white"}
      >
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
