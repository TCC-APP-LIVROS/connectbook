import { Text, ICenterProps, Center } from "native-base";

type TagProps = ICenterProps & {
  title: string;
  titleColor?: string;
};

export function Tag({
  title,
  titleColor = "white",
  bgColor = "gray.600",
  ...rest
}: TagProps) {
  return (
    <Center
      rounded="full"
      bg={"gray.600"}
      py="0.5"
      px="2"
      bgColor={bgColor}
      
      {...rest}
    >
      <Text
        color={titleColor}
        fontFamily="heading"
        fontSize="xs"
        textTransform={"uppercase"}
      >
        {title}
      </Text>
    </Center>
  );
}
