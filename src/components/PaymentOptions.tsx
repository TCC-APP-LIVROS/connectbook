import {
  Text,
  Pressable,
  Box,
  HStack,
  Image,
  IBoxProps,
} from "native-base";

import MasterCard from "@assets/Img/Card/Mastercard.png";
import { Pen, Trash } from "phosphor-react-native";

interface AddressCardProps extends IBoxProps {
  onPressDelete: () => void;
  onPressEdit: () => void;
  card: any;
}

export function PaymentOptionCard({
  card,
  onPressDelete,
  onPressEdit,
  ...rest
}: AddressCardProps) {

  return (
    <Box
      backgroundColor={"#fff"}
      padding={4}
      borderRadius={12}
      {...rest}
    >
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Image
          source={MasterCard}
          alt="Cartão de crédito"
          style={{ width: 40, height: 20 }}
        />
        <Text fontFamily={"heading"} textAlign={"center"} fontSize={"lg"} marginLeft={2} flex={1}>
          INTER ***** 1234
        </Text>
        <HStack flex={1} justifyContent={"flex-end"}>
          <Pressable onPress={onPressDelete}>
            <Trash size={24} color={"red"} />
          </Pressable>
          <Pressable marginLeft={8} onPress={onPressEdit}>
            <Pen size={24} color={"black"} />
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
