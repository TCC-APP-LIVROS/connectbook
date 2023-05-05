import { Box, Image, VStack, Text, Heading, Pressable, IPressableProps, IImageProps } from "native-base";

import { Avatar } from "@components/Avatar";



import { ImageSourcePropType } from "react-native";

type ProductCardProps = IPressableProps & {
    avatarImage?: ImageSourcePropType;
    image?: ImageSourcePropType;
    title?: string;
    price?: string;
}

export function ProductCard({avatarImage, image, title, price , ...rest}: ProductCardProps) {
  return (
    <Pressable 
    _pressed={{ opacity: "0.5" }}
    w="40"
    {...rest}
    >
        <Image w="40" alt="Alternate Text" rounded="sm" source={image} />
        <Avatar
        source={avatarImage}
          size="6"
          position="absolute"
          left="1"
          top="1"
          borderColor="gray.100"
        />
        <Box
          position="absolute"
          right="1"
          top="1"
          rounded="full"
          bg={"gray.600"}
          py="0.5"
          px="2"
        >
          <Text color="white" fontFamily="heading" fontSize="xs">
            USADO
          </Text>
        </Box>
    <Heading my="1" color="gray.600" fontSize="sm">{title}</Heading>
    <Heading color="gray.700" fontFamily="heading" fontSize="xs">R$ 59,00</Heading>
    </Pressable>
  );
}
