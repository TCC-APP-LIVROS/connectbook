import { IPressableProps, Radio } from "native-base";
import { useState } from "react";

interface AddressCardProps extends IPressableProps {
  shipping: string;
  helper?: string;
}

export function RadioButton() {
  const [value, setValue] = useState("one");

  const radioOptions = [
    { key: 1, label: "Entre os dias 20 e 22 de abril - R$22,00", value: "one" },
    { key: 2, label: "Entre os dias 24 e 29 de abril R$10,00", value: "two" },
  ];
  return (
    <Radio.Group
      name="myRadioGroup"
      accessibilityLabel="favorite number"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
    >
      {radioOptions.map((option) => (
        <Radio key={option.key} value={option.value} my={4} colorScheme={'black'}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
