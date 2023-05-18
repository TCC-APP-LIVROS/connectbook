import { HStack, Pressable, Text, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

type CheckboxProps = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function Checkbox({ options, value, onChange }: CheckboxProps) {
  function handlePress(item: string) {
    if (value?.includes(item)) {
      onChange(value.filter((i) => i !== item));
    } else {
      onChange(value.concat(item));
    }
  }
  return (
    <VStack>
      {options.map((item) => (
        <HStack key={item} alignItems={"center"}>
          <Pressable
            w="5"
            h="5"
            mr={3}
            mb={2}
            justifyContent={"center"}
            alignItems={"center"}
            borderColor={value.includes(item) ? "blue.600" : "gray.400"}
            bg={value.includes(item) ? "blue.600" : "rgba(0,0,0,0)"}
            borderWidth={2}
            rounded={"xs"}
            onPress={() => handlePress(item)}
          >
            {value.includes(item) && (
              <Feather name="check" size={14} color="white" />
            )}
          </Pressable>
          <Text
            mb={2}
            fontSize={"md"}
            color="gray.600"
            textTransform={"capitalize"}
          >
            {item}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}
