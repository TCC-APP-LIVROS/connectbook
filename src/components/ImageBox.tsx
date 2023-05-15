import { ImageSourcePropType } from "react-native";

import {
  Pressable,
  IPressableProps,
  Image,
  Circle,
  useTheme,
} from "native-base";

import { Plus, X } from "phosphor-react-native";

type ImageBoxProps = IPressableProps & {
  image?: ImageSourcePropType;
};

export function ImageBox({ image, ...rest }: ImageBoxProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      w="24"
      h="24"
      borderRadius="md"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: image ? "transparent" : colors.gray[300] }}
      _pressed={{ opacity: "0.5" }}
      {...rest}
    >
      {image ? (
        <>
          <Image height="full" width="full" rounded="md" source={image} alt="Imagem do produto" />
          <Circle position="absolute" right={1} top={1} size="4" bg="gray.600">
            <X size={12} color={colors.gray[100]} />
          </Circle>
        </>
      ) : (
        <Plus size={24} color={colors.gray[400]} />
      )}
    </Pressable>
  );
}
