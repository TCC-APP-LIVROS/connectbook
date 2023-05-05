import { Pressable, Heading, IPressableProps } from "native-base";
import { XCircle } from "phosphor-react-native";

type SwitchProps = IPressableProps & {
  value: boolean;
  title: string;
};

export function Toggle({ value, title, ...rest }: SwitchProps) {
    // true == azul
    // false == cinza
  return (
    <Pressable
      flexDirection="row"
      rounded="full"
      paddingY="1.5"
      paddingLeft="4"
      paddingRight={value ? "2" : "4"}
      bgColor={value? "blue.600" : "gray.200"}
      {...rest}
    >
      <Heading
        mr={value?  "1.5" : "0"}
        fontSize="xs"
        color={value? "white" : "gray.500"}
        fontFamily="heading"
        textTransform={"uppercase"}
      >
        {title}
      </Heading>
      {value && <XCircle size={16} weight="fill" color="#fff" />}
    </Pressable>
  );
}
