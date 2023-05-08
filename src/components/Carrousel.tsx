import { Box, Center, HStack, VStack,IBoxProps } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Dimensions, Text } from "react-native";
import RACarrousel from "react-native-reanimated-carousel";

const Indicator = ({ count, currentIndex }: { count: number, currentIndex: number}) => {
  return (
    <HStack justifyContent="center" mt="-3" px={2}>
      {Array.from(Array(count).keys()).map((i) => (
        <Box
        flex={1}
          key={i}
          bg={"gray.100"}
          opacity={i === currentIndex ? "0.75" : "0.3"}
          height="1"
          borderRadius="full"
          mx="0.5"
        />
      ))}
    </HStack>
  );
};


export function Carrousel({...rest}: IBoxProps) {
  const width = Dimensions.get("window").width;
  const data = [...new Array(6).keys()];
  let [index, setIndex] = useState(0);
  return (
    <Box {...rest}>
      <RACarrousel
        loop
        width={width}
        height={width / 2}
        data={data}
        defaultIndex={0}
        autoPlay={false}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setIndex(index)}
        renderItem={({ index }) => (
          <Box flex={1} justifyContent="center" bgColor="gray.600">
            <Center flex={1}>
              <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
            </Center>
          </Box>
        )}
      />
        <Indicator count={data.length} currentIndex={index} />
    </Box>
  );
}
