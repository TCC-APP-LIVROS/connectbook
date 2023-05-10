import { Header } from "@components/Header";
import { HStack, VStack, Text, CheckIcon, FlatList } from "native-base";
import { Plus } from "phosphor-react-native";
import { Select } from "@components/Select";
import { ProductCard } from "@components/ProductCard";

import DefaultImage from "@assets/Img/Image.png";

export function MyListing() {
  const countries = ["Todos", "Ativos", "Inativos"];
  return (
    <VStack flex={1} safeArea px="6" bg="gray.200">
      <Header title="My Listing" rightButtonIcon={<Plus size={24} />} />

      <HStack justifyContent={"space-between"} alignItems="center" mt="20">
        <Text color="gray.600">9 Anúncios</Text>
        <Select
          data={countries}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        />
      </HStack>
      <VStack mt="4" flex={1}>
        {/* da pra melhorar o espaçamento e estilo */}
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          keyExtractor={(item) => String(item)}
          numColumns={2}
          _contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <ProductCard
              mx={2}
              mb={3}
              image={DefaultImage}
              avatarImage={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
              }}
              title="Tênis Nike"
            />
          )}
        />
      </VStack>
    </VStack>
  );
}
