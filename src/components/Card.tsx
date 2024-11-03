import {
  Text,
  Divider,
  Pressable,
  Box,
  IPressableProps,
  HStack,
  useTheme,
} from "native-base";
import { PressableProps } from "react-native";
import { ReactNode } from "react";
import { Trash } from "phosphor-react-native";

interface AddressCardProps extends IPressableProps {
  text?: string;
  title?: string;
  radio?: any;
  editButtonTitle?: string;
  deleteButtonTitle?: string;
  onEditPress?: () => void;
  onDeletePress?: () => void;
  children?: ReactNode;
}

export function Card({
  title,
  text,
  radio,
  onEditPress,
  onDeletePress,
  editButtonTitle,
  deleteButtonTitle,
  children,
  ...rest
}: AddressCardProps) {
  const showEditButton = !!editButtonTitle;
  const colors = useTheme().colors;
  return (
    <Pressable
      backgroundColor={"white"}
      padding={4}
      borderRadius={12}
      {...rest}
    >
      
      {title && (
        <Text fontFamily={"heading"} fontSize={"xl"}>
          {radio && (radio)} {title}
        </Text>
      )}

      {!showEditButton && title && <Divider marginY={4} />}

      {text && <Text>{text}</Text>}

      {children}
      {showEditButton && <Divider marginY={4} />}

      <HStack width={"100%"} justifyContent={"space-between"}>
        {editButtonTitle && (
          <Box>
            <Pressable onPress={onEditPress}>
              <Text color={"blue.600"} fontFamily={"heading"}>
                {editButtonTitle}
              </Text>
            </Pressable>
          </Box>
        )}
        {deleteButtonTitle && (
          <Box>
            <Pressable onPress={onDeletePress}>
              <Trash color={colors.red[600]}  />
            </Pressable>
          </Box>
        )}
      </HStack>
    </Pressable>
  );
}
