import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { VStack, Text, Box, Avatar, Center, FlatList, Pressable, Divider } from "native-base";
import { MapPin, Wallet } from "phosphor-react-native";

const ProfileOptions = [
  {
    title: "Endereço",
    icon: <MapPin />,
    screen: "address",
  },
  {
    title: "Métodos de Pagamento",
    icon: <Wallet />,
    screen: "reply",
  },
];

export function Profile() {
    const navigation = useNavigation<AppNavigationRouteProps>();
  return (
    <VStack space={4} alignItems="center" paddingX={4} safeAreaTop>
      <Header title="Perfil" backButton/>
      <Center>
        <Avatar
          source={{
            uri: `https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-estudante-icone-de-perfil-de-usuario-avatar-de-jovem_118339-4402.jpg`,
          }}
          size="40"
        />
        <Text mt={2} fontSize="lg" fontFamily={"heading"}>
          John Doe
        </Text>
      </Center>
      <FlatList
        data={ProfileOptions}
        contentContainerStyle={{ paddingVertical: 16, gap: 8 }}
        renderItem={({ item }) => (
          <Box>
            <Pressable
            px={4}
            py={2}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderRadius={12}
            width={"80%"}
            //@ts-ignore
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text fontSize={"lg"}>{item.title}</Text>
            {item.icon}
          </Pressable>
            <Divider />
          </Box>
        )}
        keyExtractor={(item) => item.title}
      />
    </VStack>
  );
}
