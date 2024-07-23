import { Text, Divider, Pressable, Box, IPressableProps } from "native-base";
import { PressableProps } from "react-native";

interface AddressCardProps extends IPressableProps{
  address: string;
  shipping?: boolean;
  helper?: string;
}

export function AddressCard({ helper, address, shipping, ...rest }: AddressCardProps) {
  const hasAddress = !!address;
  shipping = shipping ?? true;
  helper = helper ?? "Editar ou escolher outro endereço";
  address = hasAddress ? address : "Combinar com o vendendor";
  const title = shipping ? "Enviar no meu endereço" : "Retirar com o vendendor";

  return ( 
    <Pressable backgroundColor={"white"} padding={4} borderRadius={12} {...rest}>
      <Text fontFamily={"heading"} fontSize={"xl"}>
        {title}
      </Text>
      {!hasAddress && <Divider marginY={4} />}
      <Text>{address}</Text>
      {hasAddress && <Divider marginY={4} />}
      <Box>
      {shipping && (
        <Text color={"blue.600"} fontFamily={"heading"}>
          {helper}
        </Text>
      )}
      </Box>
    </Pressable>
  );
}
