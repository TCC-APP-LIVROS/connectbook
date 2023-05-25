import { Box, HStack, Text, IStackProps } from "native-base";
import {
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Bank,
} from "phosphor-react-native";

import { PaymentMethod as payMethod } from "@dtos/ListingDTO"

type paymentMethodProps = IStackProps & {
  payment: payMethod;
  color: string;
};

export function PaymentMethod({ payment, color, ...rest }: paymentMethodProps) {
  const Icon = {
    boleto: <Barcode size={18} color={color} />,
    pix: <QrCode size={18} color={color} />,
    cash: <Money size={18} color={color} />,
    card: <CreditCard size={18} color={color} />,
    deposit: <Bank size={18} color={color} />,
  };
  return (
    <HStack alignItems="center" mt="1" {...rest}>
      <Box opacity="0.8">{Icon[payment]}</Box>
      <Text ml="2" fontSize="sm" textTransform="capitalize" color={"gray.600"}>
        {payment}
      </Text>
    </HStack>
  );
}
