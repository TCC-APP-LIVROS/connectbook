import { Box, HStack, Pressable, Text, useTheme } from "native-base";
import { Minus, Plus } from "phosphor-react-native";

type QuantityPickerProps = {
  onChange: (quantity: number) => void;
  quantity: number;
};

export function QuantityPicker({ onChange, quantity }: QuantityPickerProps) {
    const { colors } = useTheme();
  function onMinusPress() {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  }

  function onPlusPress() {
    onChange(quantity + 1);
  }

  return (
    <HStack
      borderRadius={8}
      borderWidth={1}
      borderColor="gray.200"
      width={50}
      justifyContent={"space-between"}
      space={2}
      alignItems="center"
    >
      <Pressable onPress={onMinusPress}
      >
        <Minus size={18} color={quantity == 1 ? colors.gray[400] : colors.gray[700]} />
      </Pressable>

      <Box padding={2}>
        <Text fontSize={20}>{quantity}</Text>
      </Box>
      <Pressable onPress={onPlusPress}>
        <Plus size={18} color={colors.gray[700]}/>
      </Pressable>
    </HStack>
  );
}
