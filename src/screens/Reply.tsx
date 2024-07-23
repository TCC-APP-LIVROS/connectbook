import { Header } from "@components/Header";
import { ProductCard } from "@components/ProductCard";
import { VStack, Text, Center, FlatList, Divider, Box } from "native-base";
import { useState } from "react";
import { userProductsMock } from "../mocks/products";
import { NotificationRow } from "@components/NotificationRow";
import { Pressable } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Reply() {
  const [replyText, setReplyText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const ReplyBox = () => {
    return (
      <Box backgroundColor={"white"} padding={4} borderRadius={10}>
        <Text>A placa foi utilizada em mineração?</Text>
        <Divider mt={4} mb={4} />
        <Input
          placeholder="Digite sua resposta"
          onChangeText={setReplyText}
          value={replyText}
        />
        <Button title={"Responder"} mt={4} />
      </Box>
    );
  };

  return (
    <VStack flex={1} mt={10} px={6} bg="gray.200">
      <Header title="RTX 4090 FTW" backButton />
      <Box h={50} />
      <ReplyBox />
    </VStack>
  );
}
