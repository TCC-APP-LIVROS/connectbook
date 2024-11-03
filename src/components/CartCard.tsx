import {
  Text,
  Divider,
  VStack,
  Box,
  IPressableProps,
  HStack,
  Image,
} from "native-base";
import { PressableProps } from "react-native";
import { QuantityPicker } from "./QuantityPicker";

interface AddressCardProps extends IPressableProps {
  address: string;
  shipping?: boolean;
  helper?: string;
}

export function CartCard({ helper, address, shipping, ...rest }: any) {
  const hasAddress = !!address;
  shipping = shipping ?? true;
  helper = helper ?? "Editar ou escolher outro endereço";
  address = hasAddress ? address : "Combinar com o vendendor";
  const title = shipping
    ? "Enviar no meu endereço sadasdasdasdasdasdasdasdasdasdasdasdasdasd"
    : "Retirar com o vendendor";

  return (
    <HStack
      backgroundColor={"white"}
      padding={4}
      borderRadius={12}
      {...rest}
    >
      <HStack>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          alt="Product"
          width={16}
          height={16}
        />
      </HStack>
      <VStack marginLeft={2} overflow={"hidden"} flex={1}>
        <Text fontFamily={"heading"} fontSize={"md"} numberOfLines={1}>
          {title}
        </Text>
      <HStack width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <QuantityPicker onChange={() => console.log("Change")} quantity={0} maxQuantity={2} />
        <Text fontFamily={"heading"} fontSize={"md"}>
          R$ 0,00
        </Text>
      </HStack>
      </VStack>
    </HStack>
  );
}
