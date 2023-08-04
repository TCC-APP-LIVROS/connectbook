import { TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { Box, FlatList, VStack, Text } from "native-base";

import { Header } from "@components/Header";

export function Settings() {
  const options = [
    {
      title: "Politicas de privacidade",
      onPress: () => {
        WebBrowser.openBrowserAsync(
            "https://lucaslinardapps.blogspot.com/2023/07/daily-diet-privacy-and-security.html"
          )
      },
    },
  ];

  return (
    <VStack flex={1} px={6} bg="gray.200">
      <Box>
        <Header title="Criar anúncio" backButton />
      </Box>

      <FlatList
        mt={10}
        data={options}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress}>
            <Text fontFamily="heading" fontSize="lg">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </VStack>
  );
}
