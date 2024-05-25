import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { Box, Center, HStack, Heading, Pressable } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { Platform } from "react-native";

type HeaderProps = {
  backButton?: boolean;
  title?: string;
  rightButtonIcon?: JSX.Element;
  onPressRightButton?: () => void;
  children?: any;
};

export function Header({
  backButton,
  title,
  rightButtonIcon,
  onPressRightButton,
  children
}: HeaderProps) {
  const navigation = useNavigation<AppNavigationRouteProps>();
  return (
    <HStack
      justifyContent="space-between"
      mt={Platform.OS === "ios" ? "5" : "9"}
      paddingBottom="4"
    >
      <Center flex={1}>
      {backButton && (
        <Pressable onPress={() => {navigation.goBack()}} _pressed={{ opacity: "0.5" }}>
          <ArrowLeft size={24} />
        </Pressable>
      )}
      </Center>

      <Center flex={8}>
        { title ? <Heading color="gray.700" fontSize="xl" fontFamily="heading">
          {title}
        </Heading> : children}
      </Center>
      <Pressable flex={1} alignItems="flex-end" justifyContent="center" onPress={onPressRightButton} _pressed={{ opacity: "0.5" }}>
        {rightButtonIcon}
      </Pressable>
    </HStack>
  );
}
