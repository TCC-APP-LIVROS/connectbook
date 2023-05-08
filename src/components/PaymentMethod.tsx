import { Box, HStack, Text, IStackProps } from "native-base";
import {
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Bank,
  WhatsappLogo,
} from "phosphor-react-native";

export type payment =
  | "Boleto"
  | "Pix"
  | "Dinheiro"
  | "Cartão"
  | "Depósito Bancário";

type paymentMethodProps = IStackProps & {
  payment: payment;
  color: string;
};

export function PaymentMethod({ payment, color, ...rest }: paymentMethodProps) {
  const Icon = {
    Boleto: <Barcode size={18} color={color} />,
    Pix: <QrCode size={18} color={color} />,
    Dinheiro: <Money size={18} color={color} />,
    Cartão: <CreditCard size={18} color={color} />,
    "Depósito Bancário": <Bank size={18} color={color} />,
    Whatsapp: <WhatsappLogo size={18} color={color} />,
  };
  return (
    <HStack alignItems="center" {...rest}>
      <Box opacity="0.8">{Icon[payment]}</Box>
      <Text ml="2" fontSize="sm" color={"gray.600"}>
        {payment}
      </Text>
    </HStack>
  );
}
