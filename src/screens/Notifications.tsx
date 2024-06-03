import { Header } from "@components/Header";
import { ProductCard } from "@components/ProductCard";
import { VStack, Text, Center, FlatList, Divider, Box } from "native-base";
import { useState } from "react";
import { userProductsMock } from "../mocks/products";
import { NotificationRow } from "@components/NotificationRow";
import { Pressable } from "react-native";

export function Notifications() {
  const [listings, setListings] = useState(userProductsMock);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <VStack flex={1} mt={10} px={6} bg="gray.200">
      <Header title="Notificações" />
      <Box h={50}/>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        _contentContainerStyle={{
          paddingBottom: 100,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        ItemSeparatorComponent={() => (
          <Center h={5}>
            <Divider color={"gray.600"} />
          </Center>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
          onPress={() => { console.log("Pressed")}}
          >
            <NotificationRow />
          </Pressable>
        )}
      />
    </VStack>
  );
}
