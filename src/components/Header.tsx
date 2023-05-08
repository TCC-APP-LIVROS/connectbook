import { Box, HStack, Heading, Pressable } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { Platform } from "react-native";

type HeaderProps = {
  backButton?: boolean;
  title?: string;
  rightButtonIcon?: JSX.Element;
  onPressRightButton?: () => void;
};

export function Header({
  backButton,
  title,
  rightButtonIcon,
  onPressRightButton,
}: HeaderProps) {
  return (
    <HStack
      justifyContent="space-between"
      mt={Platform.OS === "ios" ? "5" : "9"}
    >
      {backButton && (
        <Pressable onPress={() => {}} _pressed={{ opacity: "0.5" }}>
          <ArrowLeft size={24} />
        </Pressable>
      )}

      <Box>
        <Heading color="gray.700" fontSize="xl" fontFamily="heading">
          {title}
        </Heading>
      </Box>
      <Pressable onPress={onPressRightButton} _pressed={{ opacity: "0.5" }}>
        {rightButtonIcon}
      </Pressable>
    </HStack>
  );
}
