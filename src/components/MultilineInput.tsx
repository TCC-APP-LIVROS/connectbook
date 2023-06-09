import { TextArea, FormControl, ITextAreaProps } from "native-base";

type MultilineInputProps = ITextAreaProps & {
  errorMessage?: string | null;
};

export function MultilineInput({
  errorMessage,
  isInvalid,
  ...rest
}: MultilineInputProps) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} mb="4">
      <TextArea
        totalLines={8}
        autoCompleteType={"off"}
        h="40"
        px="4"
        py="3"
        mb="4"
        rounded="sm"
        borderWidth="0"
        fontFamily={"body"}
        fontSize="md"
        bgColor="white"
        color={"gray.600"}
        placeholderTextColor={"gray.400"}
        _focus={{
          borderWidth: "1",
          borderColor: "gray.500",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
