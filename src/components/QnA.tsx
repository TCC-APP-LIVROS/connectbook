import { HStack, Text, IStackProps, VStack } from "native-base";
import { ArrowBendDownRight } from "phosphor-react-native";
import { Input } from "./Input";
import { Button } from "./Button";

import { QnaMocks } from "../mocks/Qna";
import { useState } from "react";
import { Paginator } from "./paginator";

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
    QnaMocks.unshift({
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
        <Paginator />
      </HStack>

      <HStack space={1} mt="1">
        <Input
          placeholder={
            true ? "Digite sua a sua pergunta" : "Digite sua resposta"
          }
          width={"75%"}
          onChangeText={setQuestion}
          value={question}
        />
        <Button title={"Enviar"} onPress={sendQuestion} />
      </HStack>
    </VStack>
  );
}
