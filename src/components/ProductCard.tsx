import {
  Box,
  Image,
  Text,
  Heading,
  Pressable,
  IPressableProps,
} from "native-base";

import { Avatar } from "@components/Avatar";

import { ImageSourcePropType } from "react-native";
import { Tag } from "@components/Tag";

type ProductCardProps = IPressableProps & {
  avatarImage?: ImageSourcePropType;
  image: ImageSourcePropType;
  title: string;
  price: number;
  isActive?: boolean;
  isNew: boolean;
};

export function ProductCard({
  avatarImage,
  image,
  title,
  price,
  isNew,
  isActive = true,
  onPress,
  ...rest
}: ProductCardProps) {
  return (
    <Pressable onPress={onPress} _pressed={{ opacity: isActive? "0.5" : "1" }} w="40" {...rest}>
      <Box>
        <Image w="40" h="22" alt="Alternate Text" rounded="sm" source={image} />
        <Avatar
          source={avatarImage}
          size="6"
          position="absolute"
          left="1"
          top="1"
          borderColor="gray.100"
        />
        <Tag
          position="absolute"
          right="1"
          top="1"
          bgColor={isNew ? "blue.600" : "gray.600"}
          title={isNew ? "Novo" : "Usado"}
        />
        {isActive ? null : (
          <>
            <Box
              position="absolute"
              w="full"
              height="full"
              bg="gray.700"
              rounded="sm"
              opacity="0.5"
            />
            <Text
              color="gray.100"
              fontSize="xs"
              fontFamily="heading"
              position="absolute"
              bottom={2}
              left={2}
              textTransform={"uppercase"}
            >
              Anúncio desativado
            </Text>
          </>
        )}
      </Box>
      <Text mt="1" h={9} lineHeight={18} numberOfLines={2} ellipsizeMode={"tail"} color="gray.600" fontSize="sm">
        {title}
      </Text>
      <Heading color="gray.700" fontFamily="heading" fontSize="xs">
        R$ <Heading color="gray.700" fontFamily="heading" fontSize="md">{Intl.NumberFormat('pt-BR',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}</Heading>
      </Heading>
    </Pressable>
  );
}
