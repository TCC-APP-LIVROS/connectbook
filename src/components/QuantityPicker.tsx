import { Box, HStack, Pressable, Text, useTheme, useToast } from "native-base";
import { Minus, Plus } from "phosphor-react-native";

type QuantityPickerProps = {
  onChange: (quantity: number) => void;
  quantity: number;
  maxQuantity: number;
};

export function QuantityPicker({ onChange, quantity, maxQuantity }: QuantityPickerProps) {
    const { colors } = useTheme();
    const toast = useToast();
  function onMinusPress() {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  }

  function onPlusPress() {
    if(quantity >= maxQuantity){
      toast.show({
        title: "Quantidade máxima atingida",
        placement: "top",
        bgColor: "warning.500",
      });
      return
      };
    onChange(quantity + 1);
  }

  return (
    <HStack
      borderRadius={8}
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
