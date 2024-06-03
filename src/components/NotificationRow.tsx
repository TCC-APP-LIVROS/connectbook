import {
  Box,
  Image,
  Text,
  Heading,
  Pressable,
  IPressableProps,
  Tag,
  HStack,
  VStack,
} from "native-base";
import { Avatar } from "./Avatar";

export function NotificationRow() {
  return (
    <HStack
    width={"100%"}
    >
      <Box>
        <Image
          w="40"
          h="22"
          alt="Alternate Text"
          rounded="sm"
          source={{
            uri: `https://cdn.mos.cms.futurecdn.net/U6NH3kQNCBP3eXcjyyMHHi.jpg`,
          }}
        />
        <Avatar
          source={{
            uri: `https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg`,
          }}
          size="6"
          position="absolute"
          left="1"
          top="1"
          borderColor="gray.100"
        />
        <Tag
          position="absolute"
          right="1"
          top="1"
          //   bgColor={isNew ? "blue.600" : "gray.600"}
          //   title={isNew ? "Novo" : "Usado"}
          bgColor={"gray.600"}
          //   title="Novo"
        />
      </Box>
      <VStack paddingLeft={2}>
        <Heading size="sm" fontFamily="heading">Nova pergunta!</Heading>
        <Text fontSize="sm" color={"gray.600"} numberOfLines={3} ellipsizeMode="tail">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora nisi qui odit et nobis, saepe esse voluptatem nihil quam magni deserunt laudantium laboriosam. Sunt laborum pariatur eveniet totam facilis sequi.
          </Text>
      </VStack>
    </HStack>
  );
}
