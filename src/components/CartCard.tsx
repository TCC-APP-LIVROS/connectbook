import {
  Text,
  VStack,
  HStack,
  Image,
} from "native-base";
import { QuantityPicker } from "./QuantityPicker";
import { useState } from "react";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

interface CartCardProps extends IHStackProps {
  titleCard: string;
  quantity: number;
  max_quantity: number;
  price: string;
  image: string;
}

export function CartCard({ titleCard, quantity, max_quantity, price, image, ...rest }: CartCardProps) {
  console.log("CartCard", titleCard, quantity, max_quantity, price);
  const [quantityState, setQuantityState] = useState(quantity);
  return (
    <HStack
      backgroundColor={"white"}
      padding={4}
      borderRadius={12}
      {...rest}
    >
      <HStack>
        <Image
          source={{ uri: image }}
          alt="Product"
          width={16}
          height={16}
        />
      </HStack>
      <VStack marginLeft={2} overflow={"hidden"} flex={1}>
        <Text fontFamily={"heading"} fontSize={"md"} numberOfLines={1}>
          {titleCard}
        </Text>
      <HStack width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <QuantityPicker onChange={setQuantityState} quantity={quantityState} maxQuantity={max_quantity} />
        <Text fontFamily={"heading"} fontSize={"md"}>
          R$ {(parseFloat(price) * quantityState).toFixed(2)}
        </Text>
      </HStack>
      </VStack>
    </HStack>
  );
}
