import { Text, Divider, Pressable, Box, IPressableProps } from "native-base";
import { PressableProps } from "react-native";
import { ReactNode } from "react";

interface AddressCardProps extends IPressableProps {
  text?: string;
  title?: string;
  onEditPress?: () => void;
  editButtonTitle?: string;
  children?: ReactNode;
}

export function Card({
  title,
  text,
  onEditPress,
  editButtonTitle,
  children,
  ...rest
}: AddressCardProps) {
  const showEditButton = !!editButtonTitle;

  return (
    <Pressable
      backgroundColor={"white"}
      padding={4}
      borderRadius={12}
      {...rest}
    >
      {title && (
        <Text fontFamily={"heading"} fontSize={"xl"}>
          {title}
        </Text>
      )}

      {(!showEditButton && title) && <Divider marginY={4} />}

      {text && <Text>{text}</Text>}

      {children}
      {showEditButton && <Divider marginY={4} />}

      {editButtonTitle && <Box>
        {editButtonTitle && (
          <Pressable onPress={onEditPress}>
            <Text color={"blue.600"} fontFamily={"heading"}>
              {editButtonTitle}
            </Text>
          </Pressable>
        )}
      </Box>}
    </Pressable>
  );
}
