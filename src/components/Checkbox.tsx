import { HStack, Pressable, Text, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

type Option = {
  title: string;
  value: string;
}

type CheckboxProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function Checkbox({ options, value, onChange }: CheckboxProps) {
  function handlePress(item: Option) {
    if (value?.includes(item.value)) {
      onChange(value.filter((i) => i !== item.value));
    } else {
      onChange(value.concat(item.value));
    }
  }
  return (
    <VStack>
      {options.map((item) => (
        <HStack key={item.title} alignItems={"center"}>
          <Pressable
            w="5"
            h="5"
            mr={3}
            mb={2}
            justifyContent={"center"}
            alignItems={"center"}
            borderColor={value.includes(item.value) ? "blue.600" : "gray.400"}
            bg={value.includes(item.value) ? "blue.600" : "rgba(0,0,0,0)"}
            borderWidth={2}
            rounded={"xs"}
            onPress={() => handlePress(item)}
          >
            {value.includes(item.value) && (
              <Feather name="check" size={14} color="white" />
            )}
          </Pressable>
          <Text
            mb={2}
            fontSize={"md"}
            color="gray.600"
            textTransform={"capitalize"}
          >
            {item.title}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}
