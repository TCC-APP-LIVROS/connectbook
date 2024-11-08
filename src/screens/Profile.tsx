import { Header } from "@components/Header";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRouteProps } from "@routes/app.routes";
import { VStack, Text, Box, Avatar, Center, FlatList, Pressable, Divider } from "native-base";
import { Bag, Bell, CurrencyDollar, MapPin, SignOut, User, Wallet } from "phosphor-react-native";

const ProfileOptions = [
  {
    title: "Meu perfil",
    icon: <User />,
    screen: "address",
  },
  {
    title: "Meus endereços",
    icon: <MapPin />,
    screen: "address",
  },
  {
    title: "Meus cartões",
    icon: <Wallet />,
    screen: "paymentMethods",
  },
  {
    title: "Meus pedidos",
    icon: <Bag />,
    screen: "Orders",
  },
  {
    title: "Minhas vendas",
    icon: <CurrencyDollar />,
    screen: "Sales",
  },
  {
    title: "Sair",
    icon: <SignOut color="#f00" />,
    screen: "paymentMethods",
  },
];

export function Profile() {
    const navigation = useNavigation<AppNavigationRouteProps>();
    const { signOut } = useAuth();
    const { user } = useAuth();
  return (
    <VStack space={4} paddingX={4} safeAreaTop>
      <Header title="Perfil" backButton/>
      <Center>
        <Avatar
          source={{
            uri: user.photo,
          }}
          size="40"
        />
        <Text mt={2} fontSize="lg" fontFamily={"heading"}>
          John Doe
        </Text>
      </Center>
      <FlatList
        data={ProfileOptions}
        contentContainerStyle={{ paddingVertical: 16, gap: 24}}
        renderItem={({ item }) => (
          <Box width={"100%"}>
            <Pressable
            px={4}
            py={2}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            borderRadius={12}
            //@ts-ignore
            gap={4}
            width={"100%"}
            onPress={() => {
              if(item.title === "Sair") {
                signOut();
              } else{
                //@ts-ignore
                navigation.navigate(item.screen)
              }
            }}
          >
            {item.icon}
            <Text fontSize={"lg"}>{item.title}</Text>
          </Pressable>
            <Divider />
          </Box>
        )}
        keyExtractor={(item) => item.title}
      />
    </VStack>
  );
}
