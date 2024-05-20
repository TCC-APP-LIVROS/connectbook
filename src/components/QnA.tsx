import { Box, HStack, Text, IStackProps, VStack } from "native-base";
import {
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Bank,
  ArrowBendDownRight,
} from "phosphor-react-native";
import { Input } from "./Input";
import { Button } from "./Button";

import { QnaMocks } from "../mocks/Qna";
import { useState } from "react";

type paymentMethodProps = IStackProps & {
  //   payment: payMethod;
  color: string;
};

export function Qna({ color, ...rest }: any) {
  const [pagination, setPagination] = useState(0);
  const itensPerPage = 4;
  const [question, setQuestion] = useState("");

  const paginatedQna = QnaMocks.slice(
    pagination * itensPerPage,
    pagination * itensPerPage + itensPerPage
  );

  function sendQuestion() {
    QnaMocks.push({
      Question: question,
      Answer: "Em análise",
      Date: new Date().toLocaleDateString(),
    });
  }

  return (
    <VStack mt="1" {...rest}>
      {paginatedQna.map((item, index) => (
        <VStack key={index}>
          <Text fontSize="sm" textTransform="capitalize" color={"gray.600"}>
            {item.Question}
          </Text>
          <HStack space={1} mt="1" ml={2}>
            <ArrowBendDownRight size={20} color={color} />
            <Text
              ml="2"
              fontSize="sm"
              textTransform="capitalize"
              color={"gray.400"}
            >
              {item.Answer} - {item.Date}
            </Text>
          </HStack>
        </VStack>
      ))}

      <HStack mb={2} mt={2}>
        <Button
          title={"Voltar"}
          w={"50%"}
          onPress={() => setPagination(pagination - 1)}
        />
        <Button
          title={"Avançar"}
          w={"50%"}
          onPress={() => setPagination(pagination + 1)}
        />
      </HStack>

      <HStack space={1} mt="1">
        <Input
          placeholder="Digite sua resposta"
          width={"75%"}
          onChangeText={setQuestion}
          value={question}
        />
        <Button title={"Enviar"} onPress={sendQuestion} />
      </HStack>
    </VStack>
  );
}
